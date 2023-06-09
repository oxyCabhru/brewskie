import { drawerStore, type ModalSettings, modalStore } from "@skeletonlabs/skeleton";
import { brew_fetch_cask, brew_fetch_formula } from "$lib/brew_sh";
import { active_drawer, user_choice } from "$lib/store";
import About from "$lib/components/About.svelte";
import type { CaskApiResponse, FormulaApiResponse } from "$lib/types";

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
export function view_sixpacks() {
    active_drawer.set("sixpacks");
    drawerStore.open({
        bgDrawer: 'bg-secondary-900 text-white',
        bgBackdrop: 'bg-gradient-to-tr from-tertiary-500/50 via-secondary-500/50 to-primary-500/50',
        width: 'w-[280px] md:w-[480px]',
        padding: 'p-4',
        rounded: 'rounded-xl',
    });
};

export function view_selections() {
    active_drawer.set("selections");
    drawerStore.open({
        bgDrawer: 'bg-secondary-900 text-white',
        bgBackdrop: 'bg-gradient-to-tr from-tertiary-500/50 via-secondary-500/50 to-primary-500/50',
        width: 'w-[280px] md:w-[480px]',
        padding: 'p-4',
        rounded: 'rounded-xl',
    });
};

export function openAbout() {
    const modal: ModalSettings = {
        type: 'component',
        component: {
            ref: About,
            props: {},
            slot: "",
        },
    };
    modalStore.trigger(modal);
}
export function toggleBrew(e: MouseEvent) {
        if (!e.currentTarget) return;
    const target = e.currentTarget as HTMLButtonElement;
        if (!target.dataset.token) return;
        if (!target.dataset.chosen) return;
        if (!target.dataset.brewtype) return;
    const token = target.dataset.token;
    const brew_type = target.dataset.brewtype;
    let chosen = target.dataset.chosen;
    if (chosen == "true") {
        user_choice.update(val => {
            if (brew_type == "cask") {
                val.casks = val.casks.filter(el => el != token)
            } else {
                val.packages = val.packages.filter(el => el != token);
            }
            return val;
        })
        chosen = "false"
    } else {
        user_choice.update(val => {
            if (brew_type == "cask") {
                val.casks.push(token)
            } else {
                val.packages.push(token)
            }
            return val;
        })
        chosen = "true"
    }
}

export function clearAll() {
    user_choice.set({
        casks: [],
        packages: [],
    })
}