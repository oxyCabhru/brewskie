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
            {$locale.title.desc[$lang]} <a href="https://brew.sh">Homebrew.</a>
        </h2>
    </div>
    <div id="content">
        <div id="sidebar">
            {$locale.about_content.welcome[$lang]}
            <a href="https://brew.sh">Homebrew.</a>
            {$locale.about_content.welcome_now[$lang]}
        </div>
        <main>
            <slot />
        </main>
    </div>
</div>


<style>
    #brewskie {
        /* outline: 1px solid white; */
        padding: 1rem;
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 1fr 7fr;
        gap: .75rem;
    }
    #content {
        /* outline: 3px solid green; */
        display: grid;
        grid-template-columns: 1fr 4fr;
        gap: .5rem;
    }
    #topbar {
        /* outline: 1px solid red; */
    }
    #sidebar {
        padding: .5rem .75rem;
        border: 3px solid gray;
        border-radius: .6rem;
        /* outline: 1px solid blue; */
    }
    main {
        border: 3px solid gray;
        border-radius: .6rem;
        /* outline: 1px solid yellow; */
    }

</style>