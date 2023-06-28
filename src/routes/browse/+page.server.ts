import type { PageServerLoad } from "./$types.js";
import {
    fetch_cask_api,
    fetch_formula_api,
    get_latest_cask_installs,
    get_latest_formula_installs,
} from "$lib/brew_sh";


export async function load({ url }) {
    let page = Number(url.searchParams.get("page") || 1);
    if (page == 0) page = 1;
    const casks = await get_latest_cask_installs();
    const formulae = await get_latest_formula_installs();
    const casks_current_load = casks.items.slice((page - 1) * 10, page * 10);
    const formulae_current_load = formulae.items.slice((page - 1) * 10, page * 10);

    return {
        casks,
        formulae,
        stream: {
            casks: casks_current_load.map(app => fetch_cask_api(app.cask)),
            formulae: formulae_current_load.map(pkg => fetch_formula_api(pkg.formula))
        },
    }
}