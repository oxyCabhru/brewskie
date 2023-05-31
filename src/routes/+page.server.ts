import type { PageServerData } from "./$types";
import { brew_fetch_popular_casks, brew_fetch_popular_formulae } from "$lib/brew_sh";

export async function load({ url }) {
    const apps_req = brew_fetch_popular_casks();
    const packages_req = brew_fetch_popular_formulae();
    let [apps, packages] = await Promise.all([apps_req, packages_req])
    const pagination = parseInt(url.searchParams.get("p") || "0");
    apps = apps.slice(pagination * 25, pagination * 25 + 25);
    packages = packages.slice(pagination * 25, pagination * 25 + 25);
    
    return {
        apps,
        packages,
    }
}