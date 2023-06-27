<script lang="ts">
    import type { PageData } from "../$types";
    export let data
</script>

<p>casks count: {data.casks.items.length}</p>
<p>formulae count: {data.formulae.items.length}</p>
<div class="container">
    {#each data.stream.apps as app_promise}
        {#await app_promise}
            loading app
        {:then app} 
            <div class="card">
                <h1>{app.display_name}</h1>
                <h2>{app.homepage}</h2>
                <p>{app.description}</p>
            </div>
        {/await}
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-flow: row wrap;
        gap: 1rem;
    }
    .card {
        border: 1px solid pink;
        border-radius: .25rem;
        padding: 0 1rem;
    }
</style>