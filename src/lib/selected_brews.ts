import { persisted } from "svelte-local-storage-store";
import type { Writable } from "svelte/store";
import type { SelectedBrews } from "./types";

export let selected_brews: Writable<SelectedBrews> = persisted("selected", {
    casks: [],
    formulae: [],
});

export function clear_brews() {
    selected_brews.set({ casks: [], formulae: [] });
}

export function select_brew(e: MouseEvent, brew_token: string, brew_type: "cask" | "formula") {
    if ((e.target instanceof HTMLSpanElement || e.target instanceof HTMLAnchorElement) && e.target.id == "dni") return;
    selected_brews.update(brews => {
        (brew_type == "cask") ?
            brews.casks.push(brew_token)
            :
            brews.formulae.push(brew_token);
        return brews;
    });
}

export function unselect_brew(e: MouseEvent, brew_token: string, brew_type: "cask" | "formula") {
    if ((e.target instanceof HTMLSpanElement || e.target instanceof HTMLAnchorElement) && e.target.id == "dni") return;
    selected_brews.update(brews => {
        (brew_type == "cask") ?
            brews.casks = brews.casks.filter(cask_token => cask_token != brew_token)
            :
            brews.formulae = brews.formulae.filter(formula_token => formula_token != brew_token)
        return brews;
    });
}