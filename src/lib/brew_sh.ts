import got from 'got';
import millify from 'millify';
import { BrewType, type BrewMetadata, type Installs } from './types';
const URL_cask_installs = "https://formulae.brew.sh/api/analytics/cask-install/30d.json";
const URL_formula_installs = "https://formulae.brew.sh/api/analytics/install-on-request/30d.json";
const URL_cask_api = (token: string) =>
new URL(`${token}.json`, "https://formulae.brew.sh/api/cask/");
const URL_formula_api = (token: string) =>
new URL(`${token}.json`, "https://formulae.brew.sh/api/formula/");
const URL_get_google_cached_favicon = (homepage: string) =>
("https://s2.googleusercontent.com/s2/favicons?domain=" + homepage);
const stupid_cache = new Map();
stupid_cache.set("TIMESTAMP", Date.now());
const TIMEOUT = 86_400_000; // milliseconds per day
function cache_refresh() {
    if (Date.now() - stupid_cache.get("TIMESTAMP") >= TIMEOUT) {
        stupid_cache.clear();
        stupid_cache.set("TIMESTAMP", Date.now());
    };
}

export async function get_latest_cask_installs(): Promise<Installs<BrewType.Cask>> {
    cache_refresh();
    const res = await got(URL_cask_installs, { cache: stupid_cache }).json();
    return res as Installs<BrewType.Cask>;
};

export async function get_latest_formula_installs(): Promise<Installs<BrewType.Formula>> {
    cache_refresh();
    const res = await got(URL_formula_installs, { cache: stupid_cache }).json();
    return res as Installs<BrewType.Formula>;
}

const sanitized_token = (token: string) => {
    const token_split = token.split("/");
    if (token_split.length > 1) {
        return token_split.slice(-1)[0].replaceAll(/\d/g, "");
    } else {
        return token_split[0]
    }
}

export async function fetch_cask_api(token: string): Promise<BrewMetadata> {
    const url = URL_cask_api(sanitized_token(token));
    const res = await got(url, { cache: stupid_cache }).json() as any;
    const icon_url = URL_get_google_cached_favicon(res.homepage);
    const binary = (await got(icon_url)).rawBody.toString('base64');
    const data: BrewMetadata = {
        icon: new URL(res.homepage).host == "github.com" ? undefined : binary,
        type: BrewType.Cask,
        display_name: res.name[0],
        token: res.token,
        homepage: res.homepage,
        installs: millify(res.analytics.install["30d"][res.token]),
        description: res.desc,
    }
    return data;
};

export async function fetch_formula_api(token: string): Promise<BrewMetadata> {
    const url = URL_formula_api(token);
    const res = await got(url, { cache: stupid_cache }).json() as any;
    const icon_url = URL_get_google_cached_favicon(res.homepage);
    const binary = (await got(icon_url)).rawBody.toString('base64');
    const data: BrewMetadata = {
        icon: new URL(res.homepage).host == "github.com" ? undefined : binary,
        type: BrewType.Formula,
        display_name: res.name,
        token: res.name,
        homepage: res.homepage,
        installs: millify(res.analytics.install["30d"][res.name]),
        description: res.desc,
    }
    return data;
};