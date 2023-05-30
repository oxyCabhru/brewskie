import { writable, type Writable } from "svelte/store";
import type { UserChoices } from "$lib/types";
export let user_choice: Writable<UserChoices> = writable({
    casks: [],
    packages: [],
});