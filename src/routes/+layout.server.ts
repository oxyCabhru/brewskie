import type { LayoutServerLoad } from "./$types";
import { fetch_cask_api, fetch_formula_api, get_latest_cask_installs, get_latest_formula_installs } from "$lib/brew_sh";


export async function load({ params }) {
    const casks = await get_latest_cask_installs();
    const formulae = await get_latest_formula_installs(); 
    return {
        casks,
        formulae,
        test: await fetch_cask_api(casks.items[0].cask),
        test2: await fetch_formula_api(formulae.items[0].formula), 
    }
}