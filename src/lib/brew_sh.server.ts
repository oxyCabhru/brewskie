import got from 'got';
import { BrewType, type BrewMetadata, type Installs, type InstallItem } from './types';
import db from './db.server';
const fmt = Intl.NumberFormat('en', { notation: 'compact' });
const opts = {
    cache: db,
    throwHttpErrors: false,
    timeout: { request: 10000 }
};
const URL_cask_installs = "https://formulae.brew.sh/api/analytics/cask-install/30d.json";
const URL_formula_installs = "https://formulae.brew.sh/api/analytics/install-on-request/30d.json";
const URL_cask_api = (token: string) => new URL(`${token}.json`, "https://formulae.brew.sh/api/cask/");
const URL_formula_api = (token: string) => new URL(`${token}.json`, "https://formulae.brew.sh/api/formula/");
const URL_get_google_cached_favicon = (homepage: string) => ("https://s2.googleusercontent.com/s2/favicons?domain=" + homepage);
const ANALYTICS_TIMEFRAME = "90d" // "30d" | "90d" | "365d"

export async function get_latest_cask_installs(): Promise<Installs<BrewType.Cask>> {
    const res = await got(URL_cask_installs, opts).json();
    return res as Installs<BrewType.Cask>;
};

export async function get_latest_formula_installs(): Promise<Installs<BrewType.Formula>> {
    const res = await got(URL_formula_installs, opts).json();
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

export async function fetch_cask_api(item: InstallItem<BrewType.Cask>): Promise<BrewMetadata> {
    const url = URL_cask_api(sanitized_token(item.cask));
    const res = await got(url, opts).json() as any;
    let installs = res.analytics.install[ANALYTICS_TIMEFRAME][res.token];
    installs = fmt.format(installs < 1000 ? Number(item.count) : Number(installs));
    const icon_url = URL_get_google_cached_favicon(res.homepage);
    const binary = (await got(icon_url, opts)).rawBody.toString('base64');
    const data: BrewMetadata = {
        icon: new URL(res.homepage).host.includes("github") ? undefined : binary,
        type: BrewType.Cask,
        display_name: res.name[0],
        token: {
            raw: item.cask,
            sanitized: res.token,
        },
        homepage: res.homepage,
        installs,
        description: res.desc,
    }
    return data;
};

export async function fetch_formula_api(item: InstallItem<BrewType.Formula>): Promise<BrewMetadata> {
    const url = URL_formula_api(item.formula);
    const res = await got(url, opts).json() as any;
    let installs = res.analytics.install[ANALYTICS_TIMEFRAME][res.name];
    installs = fmt.format(installs < 1000 ? item.count : installs);
    const icon_url = URL_get_google_cached_favicon(res.homepage);
    const binary = (await got(icon_url, opts)).rawBody.toString('base64');
    const data: BrewMetadata = {
        icon: new URL(res.homepage).host.includes("github") ? undefined : binary,
        type: BrewType.Formula,
        display_name: res.name,
        token: {
            raw: item.formula,
            sanitized: res.name,
        },
        homepage: res.homepage,
        installs,
        description: res.desc,
    }
    return data;
};