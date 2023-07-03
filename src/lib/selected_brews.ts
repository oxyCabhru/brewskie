import { persisted } from "svelte-local-storage-store";
import type { Writable } from "svelte/store";
import type { SelectedBrews } from "./types";

export let selected_brews: Writable<SelectedBrews> = persisted("selected", {
    casks: [],
    formulae: [],
});

export function select_brew(event?: MouseEvent, brew_token?: string, brew_type?: "cask" | "formula") {
    let token: string;
    let type: string;
    if (event) {
        token = (event?.target as any).parentElement?.parentElement.parentElement.dataset.token;
        type = (event?.target as any).parentElement?.parentElement.parentElement.dataset.type;
    } else if (brew_token && brew_type) {
        token = brew_token;
        type = brew_type
    } else {
        return;
    }
    console.log(event, token)
    selected_brews.update(brews => {
        (type == "cask") ?
            brews.casks.push(token)
            :
            brews.formulae.push(token);
        return brews;
    });
}
// export function add_formula(event?: MouseEvent, brew_token?: string) {
//     let token: string;
//     if (event) {
//         token = (event?.target as any).parentElement?.parentElement.parentElement.dataset.token;
//     } else if (brew_token) {
//         token = brew_token;
//     } else {
//         return;
//     }

//     selected_brews.update(brews => {
//         brews.casks.push(token);
//         return brews;
//     });
// }

export function unselect_brew(event?: MouseEvent, brew_token?: string, brew_type?: "cask" | "formula") {
    let token: string;
    let type: string;
    if (event) {
        token = (event?.target as any).parentElement?.parentElement.parentElement.dataset.token;
        type = (event?.target as any).parentElement?.parentElement.parentElement.dataset.type;
    } else if (brew_token && brew_type) {
        token = brew_token;
        type = brew_type;
    } else {
        return;
    }
    console.warn(token, type);
    selected_brews.update(brews => {
        (type == "cask") ?
            brews.casks = brews.casks.filter(cask_token => cask_token != token)
            :
            brews.formulae = brews.formulae.filter(formula_token => formula_token != token)
        return brews;
    });
}
// export function remove_formula(event?: MouseEvent, brew_token?: string) {
//     let token: string;
//     if (event) {
//         token = (event?.target as any).parentElement?.parentElement.parentElement.dataset.token;
//     } else if (brew_token) {
//         token = brew_token;
//     } else {
//         return;
//     }

//     selected_brews.update(brews => {
//         brews.formulae = brews.formulae.filter(formula_token => formula_token != token);
//         return brews;
//     });
// }