import { writable, type Writable } from "svelte/store";
import type { UserChoices } from "$lib/types";
import { localStorageStore } from '@skeletonlabs/skeleton';

export let user_choice: Writable<UserChoices> = localStorageStore("user_choice",
    {
        casks: [],
        packages: [],
    }
);

export let lang: Writable<"en" | "he"> = localStorageStore("lang", "en");

export let active_drawer: Writable<string | null> = writable(null);

export let page_options = localStorageStore("page_options", 
    {
        first_use: true,
        autocomplete: false,
        pagination: true,
        options: true
    }
);