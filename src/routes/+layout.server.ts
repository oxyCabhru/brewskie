import type { LayoutServerLoad } from "./$types";
import { brew_fetch_popular_casks, brew_fetch_popular_formulae } from "$lib/brew_sh";

export async function load() {
    const apps = await brew_fetch_popular_casks();
    const packages = await brew_fetch_popular_formulae();
    const top5_apps = {
        ...apps,
        total_items: 5,
        items: apps.items.slice(0, 5)
    }
    const top5_pkgs = {
        ...packages,
        total_items: 5,
        items: packages.items.slice(0, 5)
    }
    return {
        apps,
        packages,
        top5_apps,
        top5_pkgs,
    }
}