import type { CaskApiResponse, CaskInstalls, FormulaApiResponse, FormulaInstalls } from "$lib/types";
import fetch from "node-fetch"; 

const CASK_INSTALLS = "https://formulae.brew.sh/api/analytics/cask-install/30d.json";
const FORMULA_INSTALLS_ON_REQUEST = "https://formulae.brew.sh/api/analytics/install-on-request/30d.json";
export async function brew_fetch_popular_casks() {
    const response = await fetch(CASK_INSTALLS);
    const json = await response.json();
    return json as CaskInstalls;
}
export async function brew_fetch_popular_formulae() {
    const response = await fetch(FORMULA_INSTALLS_ON_REQUEST);
    const json = await response.json();
    return json as FormulaInstalls;
}

const BREW_CASK_API = "https://formulae.brew.sh/api/cask/";
const BREW_FORMULA_API = "https://formulae.brew.sh/api/formula/";
export async function brew_fetch_cask(token: string) {
    const response = await fetch(BREW_CASK_API + token + ".json");
    const json = await response.json();
    return json as CaskApiResponse;
}
export async function brew_fetch_formula(slug: string) {
    const response = await fetch(BREW_FORMULA_API + slug + ".json");
    const json = await response.json();
    return json as FormulaApiResponse;
}