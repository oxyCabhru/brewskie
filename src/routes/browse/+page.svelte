<script lang="ts">
    import type { PageData } from "../$types";
    import Brew from "$lib/cmps/Brew.svelte";
    export let data;
    function toggle_view() {
        const conts = Array.from(document.getElementsByClassName("controlled"));
        const opts = Array.from(document.getElementsByClassName("opt"));
        conts.forEach((el) => el.classList.toggle("active"));
        opts.forEach((el) => el.classList.toggle("active"));
    }
</script>

<button
    class="card title lg:px-2 lg:py-4 lg:mx-4 lg:mt-4"
    on:click={toggle_view}
>
    <div class="active opt">
        <div class="card-title">Casks</div>
        <div class="card-title">Your typical applications.</div>
    </div>
    <div class="opt">
        <div class="card-title">Formulae</div>
        <div class="card-title">
            Command-line tools, applications, and runtimes.
        </div>
    </div>
</button>
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
    <div id="formulae" class="controlled card">
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
    .card.title {
        background: var(--alt-bg);
    }
    .card.title > .opt {
        display: none;
    }
    .card.title > .active.opt {
        display: block;
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
