import { persisted } from "svelte-local-storage-store";
import type { Writable } from "svelte/store";

export let lang: Writable<"en" | "he"> = persisted("lang", "en");

export let theme: Writable<{
    preserve: boolean,
    theme: "dark" | "light"
}> = persisted("theme", {
    preserve: false,
    theme: "light"
});

export function theme_handler(theme: {preserve: boolean, theme: "dark" | "light"}) {
    // if theme is unset (first visit) change to system, or if not preserving
    const system_is_dark = window.matchMedia('(prefers-color-scheme: dark)');
    if (!theme.preserve) {
        theme.theme = system_is_dark.matches ? "dark" : "light";
    };
    
    // set theme for most cases
    document.body.setAttribute("theme", theme.theme);
    
    // reset theme every theme change, respect preserve
    system_is_dark.addEventListener("change", _ => {
        if (theme.preserve) return;
        theme.theme = system_is_dark.matches ? "dark" : "light";
        document.body.setAttribute("theme", theme.theme);
    })
}