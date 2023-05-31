import type {
    CaskApiResponse,
    CaskInstalls,
    FormulaApiResponse,
    FormulaInstalls 
} from "$lib/types";
import {
    cask_installs_to_api_response,
    formula_installs_to_api_response,
} from "$lib/store";
import {
    axios
} from "$lib/mount";

const CASK_INSTALLS = "https://formulae.brew.sh/api/analytics/cask-install/30d.json";
const FORMULA_INSTALLS_ON_REQUEST = "https://formulae.brew.sh/api/analytics/install-on-request/30d.json";
export async function brew_fetch_popular_casks() {
    const response = await axios.get(CASK_INSTALLS);
    let installs = response.data as CaskInstalls;
    return await cask_installs_to_api_response(installs);
}
export async function brew_fetch_popular_formulae() {
    const response = await axios.get(FORMULA_INSTALLS_ON_REQUEST);
    let installs = response.data as FormulaInstalls;
    return await formula_installs_to_api_response(installs);
}

const BREW_CASK_API = "https://formulae.brew.sh/api/cask/";
const BREW_FORMULA_API = "https://formulae.brew.sh/api/formula/";
export async function brew_fetch_cask(token: string) {
    try {
        const response = await axios.get(BREW_CASK_API + token + ".json");
        if (response.status == 404) return null
        const json = response.data;
        return json as CaskApiResponse;
    } catch {
        return null
    }
}
export async function brew_fetch_formula(slug: string) {
    try {
        const response = await axios.get(BREW_FORMULA_API + slug + ".json");
        if (response.status == 404) return null
        const json = response.data;
        return json as FormulaApiResponse;
    } catch {
        return null
    }
}

