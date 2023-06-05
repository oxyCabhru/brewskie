import { writable, type Writable } from "svelte/store";
import type {
    CaskApiResponse,
    FormulaApiResponse,
    UserChoices } from "$lib/types";
import { brew_fetch_cask, brew_fetch_formula } from "./brew_sh";

export async function cask_installs_to_api_response(ci: {
    cask: string,
    count: string,
    percent: string,
    number: number
}[]) {
    let api_res: CaskApiResponse[] = [];
    // console.log(ci.items.map(i => i.formula));
    let await_me = ci.map(app => brew_fetch_cask(app.cask));
    api_res = ((await Promise.allSettled(await_me))
        .filter(res => res.status == "fulfilled") as PromiseFulfilledResult<CaskApiResponse>[])
        .filter(res => res.value != null)
        .map(res => res.value);
        // api_res.sort((a, b) => b.analytics.install["365d"][b.token] - a.analytics.install["365d"][a.token]);
        return api_res;
    } 
export async function formula_installs_to_api_response(ci: {
    formula: string,
    count: string,
    percent: string,
    number: number
}[]) {
    let api_res: FormulaApiResponse[] = [];
    let await_me = ci.map(app => brew_fetch_formula(app.formula));
    api_res = ((await Promise.allSettled(await_me))
    .filter(res => res.status == "fulfilled") as PromiseFulfilledResult<FormulaApiResponse>[])
    .filter(res => res.value != null)
    .map(res => res.value);
// console.log(api_res)
// api_res.sort((a, b) => b.analytics.install_on_request["365d"][b.name] - a.analytics.install_on_request["365d"][a.name]);
return api_res;
} 

export let user_choice: Writable<UserChoices> = writable({
    casks: [],
    packages: [],
});