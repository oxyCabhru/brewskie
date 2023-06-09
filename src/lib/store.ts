import { writable, type Writable } from "svelte/store";
import type { UserChoices } from "$lib/types";

export let user_choice: Writable<UserChoices> = writable({
    casks: [],
    packages: [],
});

export let active_drawer: Writable<string | null> = writable(null);

export let page_options = writable({
    autocomplete: false,
    pagination: false,
    options: true
});