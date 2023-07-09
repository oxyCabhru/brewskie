<script lang="ts">
    import "../app.css";
    import { selected_brews } from "$lib/selected_brews";
    import { theme, theme_handler, lang } from "$lib/user_prefs";
    import locale from "$lib/localization";
    import { onMount } from "svelte";
    import { Buffer } from "buffer";
    import Topbar from "$lib/cmps/Topbar.svelte";
    import Sidebar from "$lib/cmps/Sidebar.svelte";
    globalThis.Buffer = Buffer;
    onMount(() => {
        theme_handler($theme);
    });
</script>

<div id="brewskie">
    <div id="topbar">
        <Topbar />
    </div>
    <div id="content">
        <div id="sidebar">
            <Sidebar />
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
        overflow-x: hidden;
        border: 3px solid gray;
        border-radius: 0.6rem;
    }
</style>
