import type { PageServerLoad } from "./$types.js";
import {
    fetch_cask_api,
    fetch_formula_api,
    get_latest_cask_installs,
    get_latest_formula_installs,
} from "$lib/brew_sh.server";

async function fetch_resources(url: URL) {
    let page = Number(url.searchParams.get("page") || 1);
    const factor = Number(url.searchParams.get("count") || 15);
    if (page == 0) page = 1;
    let casks = await get_latest_cask_installs();
    let formulae = await get_latest_formula_installs();
    const casks_current_load = casks.items.slice((page - 1) * factor, page * factor);
    const formulae_current_load = formulae.items.slice((page - 1) * factor, page * factor);
    return {
        latest: {
            casks,
            formulae,
        },
        current: {
            casks: casks_current_load,
            formulae: formulae_current_load,
        }
    }
}

export async function load({ url }) {
    const resources = await fetch_resources(url);
    return {
        casks: resources.latest.casks,
        formulae: resources.latest.formulae,
        stream: { //return unresolved promises with their tokens to stream them in
            casks: resources.current.casks.map(app => {
                return {
                    api: fetch_cask_api(app),
                    token: app.cask
                }
            }),
            formulae: resources.current.formulae.map(pkg => {
                return {
                    api: fetch_formula_api(pkg),
                    token: pkg.formula
                }
            })
        },
    }
}