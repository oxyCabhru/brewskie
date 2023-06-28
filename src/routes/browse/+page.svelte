<script lang="ts">
    import type { PageData } from "../$types";
    import Brew from "../../components/Brew.svelte";
    export let data;
</script>

<!-- <p>casks count: {data.casks.items.length}</p> -->
<!-- <p>formulae count: {data.formulae.items.length}</p> -->
<div class="container">
    {#each data.stream.casks as app_promise}
        {#await app_promise}
            loading app
        {:then app}
            <Brew brew={app} type="cask" />
        {/await}
    {/each}
    {#each data.stream.formulae as formula_promise}
        {#await formula_promise}
            loading app
        {:then formula}
            <Brew brew={formula} type="formula" />
        {/await}
    {/each}
</div>

<style>
    .container {
        padding: 1rem;
        display: flex;
        flex-flow: row wrap;
        gap: 1rem;
    }
    .card {
        border: 1px solid pink;
        border-radius: 0.25rem;
        padding: 0 1rem;
    }
</style>
