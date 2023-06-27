import type { PageServerLoad } from "./$types.js";
import {
    fetch_cask_api,
    get_latest_cask_installs,
    get_latest_formula_installs,
    } from "$lib/brew_sh";
import { redirect } from "@sveltejs/kit";


export async function load({ url }) {
    let page = Number(url.searchParams.get("page") || 1);
    if (page == 0) page = 1;
    console.log(page)
    const casks = await get_latest_cask_installs();
    const formulae = await get_latest_formula_installs();
    const current_load = casks.items.slice((page - 1) * 10, page * 10);
    console.log(current_load)

    return {
        casks,
        formulae,
        stream: {
            apps: current_load.map(app => fetch_cask_api(app.cask))
        },
    }
}