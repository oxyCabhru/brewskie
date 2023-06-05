import type { PageServerData } from "./$types";
import { brew_fetch_cask, brew_fetch_formula, brew_fetch_popular_casks, brew_fetch_popular_formulae } from "$lib/brew_sh";
import type { Brew } from "$lib/types";

export async function load({ url }) {
    const pagination = parseInt(url.searchParams.get("p") || "0");
    const amount = parseInt(url.searchParams.get("c") || "50")
    let [cask_installs, pkg_installs] = await Promise.all([
        brew_fetch_popular_casks(), brew_fetch_popular_formulae()
    ]);
    const total = cask_installs.items.length + pkg_installs.items.length;
    const available_brews: Brew[] = 
        [...cask_installs.items.map(brew => {
            return {token: brew.cask, type: "cask"} as Brew
        }),
        ...pkg_installs.items.map(brew => {
            return {token: brew.formula, type: "formula"} as Brew
        })];
    const apps = cask_installs.items.slice(pagination * (amount / 2), pagination * (amount / 2) + (amount / 2));
    const packages = pkg_installs.items.slice(pagination * (amount / 2), pagination * (amount / 2) + (amount / 2));
    
    return {
        pagination,
        amount,
        total,
        available_brews,
        apps,
        packages,
        stream: {
            apps: apps.map(app => {
                return {
                    data: brew_fetch_cask(app.cask),
                    token: app.cask
                }
            }),
            packages: packages.map(pkg => {
                return {
                    data: brew_fetch_formula(pkg.formula),
                    token: pkg.formula
                }
            })
        }
    }
}