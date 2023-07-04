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
        const target = (event?.target as any).parentElement.parentElement.parentElement.parentElement.parentElement;
        token = target.dataset.token;
        type = target.dataset.type;
    } else if (brew_token && brew_type) {
        token = brew_token;
        type = brew_type
    } else {
        return;
    }
    selected_brews.update(brews => {
        (type == "cask") ?
            brews.casks.push(token)
            :
            brews.formulae.push(token);
        return brews;
    });
}

export function unselect_brew(event?: MouseEvent, brew_token?: string, brew_type?: "cask" | "formula") {
    let token: string;
    let type: string;
    if (event) {
        const target = (event?.target as any).parentElement.parentElement.parentElement.parentElement.parentElement;
        token = target.dataset.token;
        type = target.dataset.type;
    } else if (brew_token && brew_type) {
        token = brew_token;
        type = brew_type;
    } else {
        return;
    }
    selected_brews.update(brews => {
        (type == "cask") ?
            brews.casks = brews.casks.filter(cask_token => cask_token != token)
            :
            brews.formulae = brews.formulae.filter(formula_token => formula_token != token)
        return brews;
    });
}