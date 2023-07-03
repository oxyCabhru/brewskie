<script lang="ts">
    import "../app.css";
    import { selected_brews } from "$lib/store";
    import { theme, theme_handler, lang } from "$lib/user_prefs";
    import locale from "$lib/localization";
    import { onMount } from "svelte";
    onMount(() => {
        theme_handler($theme);
    });
</script>

<div id="brewskie">
    <div id="topbar">
        <h1 class="text-3xl">
            {$locale.title.brewskie[$lang]}
        </h1>
        <h2 class="text-xl opacity-70">
            {$locale.title.desc[$lang]}
            <a class="link" href="https://brew.sh">Homebrew</a>.
        </h2>
    </div>
    <div id="content">
        <div id="sidebar">
            {$locale.about_content.welcome[$lang]}
            <a class="link" href="https://brew.sh">Homebrew</a>
            {$locale.about_content.welcome_now[$lang]}
            {JSON.stringify($selected_brews)}
        </div>
        <div id="page">
            <slot />
        </div>
    </div>
</div>

<style>
    #brewskie {
        flex-grow: 1;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    #content {
        display: grid;
        grid-template-columns: 1fr 4fr;
        gap: 0.5rem;
        flex-grow: 1;
        overflow-y: auto;
    }
    #topbar {
    }
    #sidebar {
        padding: 0.5rem 0.75rem;
        border: 3px solid gray;
        border-radius: 0.6rem;
    }
    #page {
        overflow-y: auto;
        border: 3px solid gray;
        border-radius: 0.6rem;
    }
</style>
