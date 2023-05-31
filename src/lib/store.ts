import { writable, type Writable } from "svelte/store";
import type {
    CaskApiResponse,
    CaskInstalls,
    FormulaApiResponse,
    FormulaInstalls,
    UserChoices } from "$lib/types";
import { brew_fetch_cask, brew_fetch_formula } from "./brew_sh";

export async function cask_installs_to_api_response(ci: CaskInstalls) {
    let api_res: CaskApiResponse[] = [];
    ci.items.forEach(async app => {
        const res = await brew_fetch_cask(app.formula);
        if (res) api_res.push(res);
    });
    api_res.sort((a, b) => b.analytics.install["365d"][b.token] - a.analytics.install["365d"][a.token]);
    return api_res;
} 
export async function formula_installs_to_api_response(ci: FormulaInstalls) {
    let api_res: FormulaApiResponse[] = [];
    let await_me = ci.items.map(app => brew_fetch_formula(app.formula));
    api_res = ((await Promise.allSettled(await_me))
        .filter(res => res.status == "fulfilled") as PromiseFulfilledResult<FormulaApiResponse>[])
        .map(res => res.value);
    // console.log(api_res)
    // api_res.sort((a, b) => b.analytics.install_on_request["365d"][b.name] - a.analytics.install_on_request["365d"][a.name]);
    return api_res;
} 

export let user_choice: Writable<UserChoices> = writable({
    casks: [],
    packages: [],
});