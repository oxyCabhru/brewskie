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
    return response.data as CaskInstalls;
    // return await cask_installs_to_api_response(installs);
}
export async function brew_fetch_popular_formulae() {
    const response = await axios.get(FORMULA_INSTALLS_ON_REQUEST);
    return response.data as FormulaInstalls;
    // return await formula_installs_to_api_response(installs);
}

const BREW_CASK_API = "https://formulae.brew.sh/api/cask/";
const BREW_FORMULA_API = "https://formulae.brew.sh/api/formula/";
export async function brew_fetch_cask(token: string) {
    try {
        const response = await axios.get(BREW_CASK_API + token + ".json");
        const json = response.data;
        return json as CaskApiResponse;
    } catch (err: any) {
        try {
            const sanitized = (BREW_CASK_API + token + ".json").replace(/[0-9]/g, "");
            const response = await axios.get(sanitized);
            return response.data as CaskApiResponse;
        } catch {
            if (err.toString().includes("404")) {
                return `Error fetching data for ${token}!`
            }
        }
        if (err.toString().includes("404")) {
            return `Error fetching data for ${token}!`
        }
    }
}
export async function brew_fetch_formula(slug: string) {
    try {
        const response = await axios.get(BREW_FORMULA_API + slug + ".json");
        const json = response.data;
        return json as FormulaApiResponse;
    } catch (err: any) {
        try {
            const santizied = (BREW_FORMULA_API + slug + ".json").replace(/[0-9]/g, "");
            const response = await axios.get(santizied)
            return response.data as FormulaApiResponse;
        } catch {
            if (err.toString().includes("404")) {
                return `Error fetching data for ${slug}!`
            }
        }
        if (err.toString().includes("404")) {
            return `Error fetching data for ${slug}!`
        }
    }
}

