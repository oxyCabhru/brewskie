import got from "got";
import type { Method } from "got";
import db from '$lib/db.server';
import { BrewType } from "$lib/types";
import { fetch_cask_api, fetch_formula_api, get_latest_cask_installs, get_latest_formula_installs } from "$lib/brew_sh.server.js";
import { fetch_brewskie } from "$lib/persist_bundles.server.js";

// const URL_algolia = "https://d9hg3g8gs4-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.8.5)%3B%20Browser%20(lite)%3B%20docsearch%20(3.5.1)%3B%20docsearch-react%20(3.5.1)%3B%20docsearch.js%20(3.5.1)&x-algolia-api-key=e3369d62b2366b374c54b2c5a2835a00&x-algolia-application-id=D9HG3G8GS4";
// const opts_query = (query: string) => {
//     return {
//         cache: db,
//         throwHttpErrors: false,
//         method: "POST" as Method,
//         headers: {
//             "Accept": "application/json",
//             "content-type": "application/x-www-form-urlencoded",
//             "Sec-Fetch-Dest": "empty",
//             "Sec-Fetch-Mode": "cors",
//             "Sec-Fetch-Site": "cross-site",
//         },
//         json: {
//             requests: [
//                 {
//                     query: query,
//                     indexName: "brew_all",
//                     params: "attributesToRetrieve=%5B%22hierarchy.lvl0%22%2C%22hierarchy.lvl1%22%2C%22hierarchy.lvl2%22%2C%22hierarchy.lvl3%22%2C%22hierarchy.lvl4%22%2C%22hierarchy.lvl5%22%2C%22hierarchy.lvl6%22%2C%22content%22%2C%22type%22%2C%22url%22%5D&attributesToSnippet=%5B%22hierarchy.lvl1%3A10%22%2C%22hierarchy.lvl2%3A10%22%2C%22hierarchy.lvl3%3A10%22%2C%22hierarchy.lvl4%3A10%22%2C%22hierarchy.lvl5%3A10%22%2C%22hierarchy.lvl6%3A10%22%2C%22content%3A10%22%5D&snippetEllipsisText=%E2%80%A6&highlightPreTag=%3Cmark%3E&highlightPostTag=%3C%2Fmark%3E&hitsPerPage=20&clickAnalytics=false&facetFilters=%5B%22site%3A%20%22%5D"
//                 }
//             ]
//         }
//     }
// };
const sanitized_token = (token: string) => {
    const token_split = token.split("/");
    if (token_split.length > 1) {
        return token_split.slice(-1)[0].replaceAll(/\d/g, "");
    } else {
        return token_split[0]
    }
}

export async function GET({ request }) {
    const params = new URL(request.url).searchParams;
    const hash = params.get("hash");
    if (hash) {
        return new Response(await fetch_brewskie(hash));
    }
    const token = params.get("token");
    const type = params.get("type");
    if (!token || !type) return new Response(JSON.stringify({ comment: "invalid token or type" }))
    const api = type == BrewType.Cask
        ? await fetch_cask_api({ cask: sanitized_token(token), count: "0", percent: "0", number: 0 })
        : await fetch_formula_api({ formula: sanitized_token(token), count: "0", percent: "0", number: 0 })
    return new Response(JSON.stringify(api))
}

export async function POST({ request }) {
    const req = await request.json();
    const query: string = req.query;
    // const res: any = await got(URL_algolia, opts_query(query)).json();
    // const hits: { type: BrewType; brew: string }[] = res.results[0].hits
    //     .map((val: any) => {
    //         return {
    //             type: val.hierarchy.lvl0,
    //             brew: val.hierarchy.lvl1
    //         }
    //     })
    //     .filter((val: any) =>
    //         ["Formulae", "Casks"].includes(val.type) && !val.brew.includes("(deprecated)")
    //     )
    //     .map((val: any) => {
    //         val.type = val.type == "Casks" ? BrewType.Cask : BrewType.Formula;
    //         return val;
    //     })
    const hits = [
        ...(await get_latest_cask_installs()).items.map(item => { return { type: BrewType.Cask, brew: item.cask } }),
        ...(await get_latest_formula_installs()).items.map(item => { return { type: BrewType.Formula, brew: item.formula } }),
    ].sort().filter(brew => brew.brew.includes(query));
    return new Response(JSON.stringify(hits))
}