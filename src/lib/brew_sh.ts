import got from 'got';
import millify from 'millify';
import type { ApiResponse, CaskInstalls, FormulaInstalls } from './types';
const URL_cask_installs = "https://formulae.brew.sh/api/analytics/cask-install/30d.json";
const URL_formula_installs = "https://formulae.brew.sh/api/analytics/install-on-request/30d.json";
const URL_cask_api = (token: string) =>
    new URL(`${token}.json`, "https://formulae.brew.sh/api/cask/");
const URL_formula_api = (token: string) =>
    new URL(`${token}.json`, "https://formulae.brew.sh/api/formula/");
const stupid_cache = new Map();
stupid_cache.set("TIMESTAMP", Date.now());
const TIMEOUT = 86_400_000; // milliseconds per day
function cache_refresh() {
    if (Date.now() - stupid_cache.get("TIMESTAMP") >= TIMEOUT) {
        stupid_cache.clear();
        stupid_cache.set("TIMESTAMP", Date.now());
    };
}

export async function get_latest_cask_installs(): Promise<CaskInstalls> {
    cache_refresh();
    const res = await got(URL_cask_installs, { cache: stupid_cache }).json();
    return res as CaskInstalls;
};

export async function get_latest_formula_installs(): Promise<FormulaInstalls> {
    cache_refresh();
    const res = await got(URL_formula_installs, { cache: stupid_cache }).json();
    return res as FormulaInstalls;
}

export async function fetch_cask_api(token: string): Promise<ApiResponse> {
    // cache_refresh();
    const url = URL_cask_api(token);
    const res = await got(url, { cache: stupid_cache }).json() as any;
    const data: ApiResponse = {
        display_name: res.name[0],
        token: res.token,
        homepage: res.homepage,
        installs: millify(res.analytics.install["30d"][res.token]),
        description: res.desc,
    }
    return data;
};

export async function fetch_formula_api(token: string): Promise<ApiResponse> {
    // cache_refresh();
    const url = URL_formula_api(token);
    const res = await got(url, { cache: stupid_cache }).json() as any;
    const data: ApiResponse = {
        display_name: res.name,
        token: res.token,
        homepage: res.homepage,
        installs: millify(res.analytics.install["30d"][res.name]),
        description: res.desc,
    }
    return data;
};