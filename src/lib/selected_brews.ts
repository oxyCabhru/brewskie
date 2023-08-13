import { persisted } from "svelte-local-storage-store";
import { get, type Writable } from "svelte/store";
import type { SelectedBrews } from "./types";

export let selected_brews: Writable<SelectedBrews> = persisted("selected", {
    casks: [],
    formulae: [],
});

export function clear_brews() {
    selected_brews.set({ casks: [], formulae: [] });
}

export function arr_includes(arr: string[], other: string[]): boolean {
    return other.every((token) => arr.includes(token));
}

/**
 * NOTE: when entering an array, specifying the brew_type is required.
 * @param brew_token_s a single brew token or an array of them.
 * @param brew_type optional for performance, unless querying an array
 * @param _ optional, just for activating reactive statements
 * @returns boolean
 */
export function is_selected(brew_token_s: string | string[], brew_type?: "cask" | "formula", _?: SelectedBrews): boolean {
    let sb: SelectedBrews = get(selected_brews);
    if (typeof brew_token_s == "string") {
        if (brew_type == "cask") {
            return sb.casks.includes(brew_token_s);
        } else if (brew_type == "formula") {
            return sb.formulae.includes(brew_token_s);
        }
        return sb.casks.includes(brew_token_s) && sb.formulae.includes(brew_token_s);
    } else {
        if (!brew_type) { console.error("Just tried to query the selected brews with an unfiltered array of tokens!"); return false};
        return arr_includes(
            (brew_type == "cask") 
            ? sb.casks 
            : sb.formulae,
            brew_token_s
        );
    }
}

export function toggle_brew(e: MouseEvent, brew_token: string, brew_type: "cask" | "formula") {
    let sb: SelectedBrews = get(selected_brews);
    if (sb.casks.includes(brew_token) || sb.formulae.includes(brew_token)) {
        unselect_brew(e, brew_token, brew_type);
    } else {
        select_brew(e, brew_token, brew_type);
    }
}

function sort_brews(b: SelectedBrews) {
    b.casks.sort();
    b.formulae.sort();
}

export function select_brew(e: MouseEvent, brew_token: string, brew_type: "cask" | "formula") {
    if ((e.target instanceof HTMLSpanElement || e.target instanceof HTMLAnchorElement) && e.target.id == "dni") return;
    if (is_selected(brew_token, brew_type)) return;
    selected_brews.update(brews => {
        (brew_type == "cask") ?
            brews.casks.push(brew_token)
            :
            brews.formulae.push(brew_token);
            sort_brews(brews);
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
            sort_brews(brews);
        return brews;
    });
}