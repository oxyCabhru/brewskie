import got from 'got';
import type { ApiResponse, CaskInstalls, FormulaInstalls } from './types';
const URL_cask_installs =           "https://formulae.brew.sh/api/analytics/cask-install/30d.json";
const URL_formula_installs =        "https://formulae.brew.sh/api/analytics/install-on-request/30d.json";
const BASEURL_cask_api =            "https://formulae.brew.sh/api/cask/";
const BASEURL_formula_api =         "https://formulae.brew.sh/api/formula/";

export async function get_latest_cask_installs(): Promise<CaskInstalls> {
    const res = await got(URL_cask_installs);
    return JSON.parse(res.body);
};

export async function get_latest_formula_installs(): Promise<FormulaInstalls> {
    const res = await got(URL_formula_installs);
    return JSON.parse(res.body);
}

export async function fetch_cask_api(token: string): Promise<ApiResponse> {
    const url = new URL(`${token}.json`, BASEURL_cask_api);
    const res = JSON.parse((await got(url)).body);
    const data: ApiResponse = {
        display_name: res.name[0],
        token: res.token,
        homepage: res.homepage,
        installs: res.analytics.install["30d"][res.token],
        description: res.desc,
    }
    return data;
};

export async function fetch_formula_api(token: string): Promise<ApiResponse> {
    const url = new URL(`${token}.json`, BASEURL_formula_api);
    const res = JSON.parse((await got(url)).body);
    const data: ApiResponse = {
        display_name: res.name,
        token: res.token,
        homepage: res.homepage,
        installs: res.analytics.install["30d"][res.token],
        description: res.desc,
    }
    return data;
};