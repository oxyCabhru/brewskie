import { persisted } from "svelte-local-storage-store";
import type { Writable } from "svelte/store";
import type { SelectedBrews } from "./types";

export let selected_brews: Writable<SelectedBrews> = persisted("selected", {
    casks: [],
    formulae: [],
});

