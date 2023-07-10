<script lang="ts">
    import type { PageData } from "../$types";
    import { page } from "$app/stores";
    import Brew from "$lib/cmps/Brew.svelte";
    export let data;
    const sum = data.casks.total_items + data.formulae.total_items;
    let pagination: number;
    let count: number;
    $: pagination = Number($page.url.searchParams.get("page") || 1);
    $: count = Number($page.url.searchParams.get("count") || 15);
    function toggle_view() {
        const conts = Array.from(document.getElementsByClassName("controlled"));
        const opts = Array.from(document.getElementsByClassName("opt"));
        [...conts, ...opts].forEach((el) => el.classList.toggle("active"));
    }
</script>

<div
    class="browse-bar lg:rounded-2xl px-14 shadow-xl lg:px-2 lg:py-4 lg:mx-4 lg:mt-4"
>
    <button class="active opt" on:click={toggle_view}>
        <p>Casks</p>
        <p class="hidden lg:block">Your typical applications.</p>
    </button>
    <div class="extras text-xl flex flex-col items-center">
        <div class="flex gap-2">
            <a href={`?page=${pagination <= 1 ? 1 : pagination - 1}`}>
                <ion-icon name="caret-back-outline" />
            </a>
            <button>
                <ion-icon name="search-outline" />
            </button>
            <a href={`?page=${pagination + 1}`}>
                <ion-icon name="caret-forward-outline" />
            </a>
        </div>
        <div
            title={`${data.stream.casks.length} casks & ${data.stream.formulae.length} formulae`}
        >
            {#key pagination}
                <span>
                    {(pagination - 1) * count * 2} - {pagination * count * 2}
                </span>
                <span style="color: var(--brew-sh-link)">/ {sum}</span>
            {/key}
        </div>
    </div>
    <button class="opt" on:click={toggle_view}>
        <p>Formulae</p>
        <p class="hidden lg:block">
            Command-line tools, applications, and runtimes.
        </p>
    </button>
</div>
<div id="controller" class="lg:px-2 lg:py-4">
    <div id="casks" class="w-full lg:w-auto controlled card active">
        <div
            class="container gap-2 lg:gap-4 lg:p-4 grid lg:flex lg:flex-row lg:flex-wrap"
        >
            {#each data.stream.casks as app}
                {#await app.api}
                    <div class="card shadow">
                        <div class="card-title">
                            <span class="loading loading-spinner" />
                            {app.token}
                        </div>
                    </div>
                {:then api_response}
                    <Brew brew={api_response} />
                {:catch err}
                    <error token={app.token} reason={err}>
                        {app.token} metadata couldn't be loaded despite the sanitation
                        of the token. This is usually due to the cask being only
                        available via taps, which isn't yet(?) supported.
                    </error>
                {/await}
            {/each}
        </div>
    </div>
    <div id="formulae" class="w-full lg:w-auto controlled card">
        <div
            class="container gap-2 lg:gap-4 lg:p-4 grid lg:flex lg:flex-row lg:flex-wrap"
        >
            {#each data.stream.formulae as pkg}
                {#await pkg.api}
                    <div class="card shadow">
                        <div class="card-title">
                            <span class="loading loading-spinner" />
                            {pkg.token}
                        </div>
                    </div>
                {:then api_response}
                    <Brew brew={api_response} />
                {:catch err}
                    <error token={pkg.token} reason={err}>
                        {pkg.token} metadata couldn't be loaded despite the sanitation
                        of the token. This is usually due to the formula being only
                        available via taps, which isn't yet(?) supported.
                    </error>
                {/await}
            {/each}
        </div>
    </div>
</div>

<style>
    error {
        display: none;
    }
    .extras ion-icon {
        visibility: visible;
    }
    .browse-bar {
        border: solid rgba(0, 0, 0, 0.4) 1px;
        background: var(--brew-sh-bg);
        display: flex;
        gap: 1rem;
        justify-content: space-around;
        user-select: none;
    }
    .opt {
        opacity: 0.5;
        transition: opacity 150ms ease-in-out;
        pointer-events: auto;
        cursor: pointer;
    }
    .opt:hover {
        color: var(--brew-sh-link-h);
    }

    .active.opt {
        opacity: 1;
        pointer-events: none;
        cursor: default;
    }
    #controller {
        isolation: isolate;
        position: relative;
    }
    .controlled {
        position: absolute;
        opacity: 0;
        z-index: -1;
        pointer-events: none;
        transform: translate(5rem, 1rem);
        transition: opacity 150ms ease-in-out, transform 150ms linear;
    }
    #controller > .active {
        opacity: 1;
        z-index: 1;
        pointer-events: auto;
        transform: translate(0, 0);
    }
</style>
