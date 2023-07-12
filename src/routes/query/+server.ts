import got, { type Method } from "got";
import db from '$lib/db';
import { BrewType } from "$lib/types";

const URL_algolia = "https://d9hg3g8gs4-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.8.5)%3B%20Browser%20(lite)%3B%20docsearch%20(3.5.1)%3B%20docsearch-react%20(3.5.1)%3B%20docsearch.js%20(3.5.1)&x-algolia-api-key=e3369d62b2366b374c54b2c5a2835a00&x-algolia-application-id=D9HG3G8GS4";
const opts_query = (query: string) => {
    return {
        cache: db,
        throwHttpErrors: false,
        method: "POST" as Method,
        headers: {
            "Accept": "application/json",
            "content-type": "application/x-www-form-urlencoded",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
        },
        json: {
            requests: [
                {
                    query: query,
                    indexName: "brew_all",
                    params: "attributesToRetrieve=%5B%22hierarchy.lvl0%22%2C%22hierarchy.lvl1%22%2C%22hierarchy.lvl2%22%2C%22hierarchy.lvl3%22%2C%22hierarchy.lvl4%22%2C%22hierarchy.lvl5%22%2C%22hierarchy.lvl6%22%2C%22content%22%2C%22type%22%2C%22url%22%5D&attributesToSnippet=%5B%22hierarchy.lvl1%3A10%22%2C%22hierarchy.lvl2%3A10%22%2C%22hierarchy.lvl3%3A10%22%2C%22hierarchy.lvl4%3A10%22%2C%22hierarchy.lvl5%3A10%22%2C%22hierarchy.lvl6%3A10%22%2C%22content%3A10%22%5D&snippetEllipsisText=%E2%80%A6&highlightPreTag=%3Cmark%3E&highlightPostTag=%3C%2Fmark%3E&hitsPerPage=20&clickAnalytics=false&facetFilters=%5B%22site%3A%20%22%5D"
                }
            ]
        }
    }
};

export async function POST({ request }) {
    const query: string = (await request.json()).query;
    const res: any = await got(URL_algolia, opts_query(query)).json();
    const hits: { type: BrewType; brew: string }[] = res.results[0].hits
        .map((val: any) => {
            return {
                type: val.hierarchy.lvl0,
                brew: val.hierarchy.lvl1
            }
        })
        .filter((val: any) =>
            ["Formulae", "Casks"].includes(val.type) && !val.brew.includes("(deprecated)")
        )
        .map((val: any) => {
            val.type = val.type == "Casks" ? BrewType.Cask : BrewType.Formula;
            return val;
        })
    return new Response(JSON.stringify(hits))
}