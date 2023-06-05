<script lang="ts">
	import { user_choice } from "$lib/store";
	import { Download, ExternalLink } from "lucide-svelte";
	import type { CaskApiResponse, FormulaApiResponse } from "$lib/types";
	// import millify from "millify";
    export let apps: {
        number: number,
        count: string,
        cask: string,
        percent: string,
    }[];
    export let packages: {
        number: number,
        count: string,
        formula: string,
        percent: string,
    }[];
    export let stream: {
        apps: {data: Promise<CaskApiResponse | any>, token: string}[],
        packages: { data: Promise<FormulaApiResponse | any>, token: string}[]
    };
    function toggleBrew(e: MouseEvent) {
            if (!e.currentTarget) return;
		const target = e.currentTarget as HTMLButtonElement;
            if (!target.dataset.token) return;
            if (!target.dataset.chosen) return;
            if (!target.dataset.brewtype) return;
        const token = target.dataset.token;
        const brew_type = target.dataset.brewtype;
		let chosen = target.dataset.chosen;
		if (chosen == "true") {
			user_choice.update(val => {
                if (brew_type == "cask") {
                    val.casks = val.casks.filter(el => el != token)
                } else {
                    val.packages = val.packages.filter(el => el != token);
                }
				return val;
			})
			chosen = "false"
		} else {
			user_choice.update(val => {
                if (brew_type == "cask") {
                    val.casks.push(token)
                } else {
                    val.packages.push(token)
                }
				return val;
			})
			chosen = "true"
		}
	}
</script>

<div class="container">
    {#each apps as cask}
        <button
            class={`${$user_choice.casks.includes(cask.cask) ?
                "card-variant-filled-primary" : "card variant-glass-primary"}
                card-hover`}
            on:click={toggleBrew}
            data-brewtype="cask"
            data-token={cask.cask}
            data-chosen={$user_choice.casks.includes(cask.cask)}
            >
            {#await stream.apps.find(brew => brew.token == cask.cask)?.data}
                <div class="card-header">
                    <h1>{cask.cask}
                    </h1>
                    <span
                        class="badge variant-filled-primary"
                    title="Downloads in the past 90 days">
                    <!-- {millify(parseInt(cask.count))} -->
                    {parseInt(cask.count)}
                    <Download style="display: inline" size={18} />
                </span>
                </div>
            {:then api_response} 
                {#if typeof api_response == "object"}
                <div class="card-header">
                    <h1>{api_response.name[0]}
                        <a href={api_response.homepage} target="_blank" title={api_response.name + " homepage as reported by brew.sh"}>
                            <ExternalLink style="display: inline" size={18}/>
                        </a>
                    </h1>
                    <span
                                class="badge variant-filled-primary"
                        title="Downloads in the past 30 days">
                        <!-- {millify(parseInt(api_response.analytics.install["30d"][api_response.token]))} -->
                        {parseInt(api_response.analytics.install["30d"][api_response.token])}
                        <Download style="display: inline" size={18} />
                    </span>
                </div>
                <p>{api_response.desc}</p>
                {:else}
                <span class="opacity-30">{api_response}</span>
                {/if}
            {/await}
        </button>
    {/each}
</div>
<div class="container">
    {#each packages as pkg}
        <button
            class={`${$user_choice.packages.includes(pkg.formula) ?
                "card-variant-filled-secondary" : "card variant-glass-secondary"}
                card-hover`}
            on:click={toggleBrew}
            data-brewtype="formula"
            data-token={pkg.formula}
            data-chosen={$user_choice.packages.includes(pkg.formula)}
            >
            {#await stream.packages.find(brew => brew.token == pkg.formula)?.data}
            <div class="card-header">
                <h1>{pkg.formula}</h1>
                <span
                class="badge variant-filled-primary"
                title="Downloads in the past 90 days">
                <!-- {millify(parseInt(pkg.count))} -->
                {parseInt(pkg.count)}
                <Download style="display: inline" size={18} />
            </span>
            </div>
            {:then formula} 
                {#if typeof formula == "object"}
                <div class="card-header">
                    <h1>{formula.name}
                        <a href={formula.homepage} target="_blank" title={formula.name + " homepage as reported by brew.sh"}>
                            <ExternalLink style="display: inline" size={18}/>
                        </a>
                    </h1>
                    <span
                        class="badge variant-filled-primary"
                        title="Downloads in the past 30 days">
                        <!-- {millify(parseInt(formula.analytics.install_on_request["30d"][formula.name]))} -->
                        {parseInt(formula.analytics.install_on_request["30d"][formula.name])}
                        <Download style="display: inline" size={18} />
                    </span>
                </div>
                <p>{formula.desc}</p>
                {:else}
                <span class="opacity-30">{formula}</span>
                {/if}
            {/await}
        </button>
    {/each}
</div>

<style>
    .container {
		display: grid;
        grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
	}
	.card {
		padding: .25rem;
	}
	.card-header {
		padding: .25rem 1rem;
        display: flex;
        justify-content:space-between;
        margin-bottom: .5rem;
	}
    span {
        float: inline-end;
        height: fit-content;
    }
</style>