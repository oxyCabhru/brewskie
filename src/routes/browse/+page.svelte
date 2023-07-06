<script lang="ts">
    import type { PageData } from "../$types";
    import Brew from "$lib/cmps/Brew.svelte";
    export let data;
</script>

<div class="lg:px-2 lg:py-4">
    <div class="card">
        <div class="card-title">Casks</div>
        <div class="card-title">Your typical applications.</div>
        <div class="container gap-2 lg:gap-4 lg:p-4 grid lg:flex lg:flex-row lg:flex-wrap">
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
                        available via taps, which isn't yet supported.
                    </error>
                {/await}
            {/each}
        </div>
    </div>
    <div class="card">
        <div class="card-title">Formulae</div>
        <div class="card-title">
            Command-line tools, applications, and runtimes.
        </div>
        <div class="container gap-4 p-4 grid lg:flex lg:flex-row lg:flex-wrap">
            {#each data.stream.formulae as pkg}
                {#await pkg.api}
                    loading {pkg.token}..
                {:then api_response}
                    <Brew brew={api_response} />
                {:catch err}
                    <error token={pkg.token} reason={err}>
                        {pkg.token} metadata couldn't be loaded despite the sanitation
                        of the token. This is usually due to the formula being only
                        available via taps, which isn't yet supported.
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
</style>
