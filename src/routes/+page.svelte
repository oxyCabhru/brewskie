<script lang="ts">
    import { user_choice } from "$lib/store";
	import {ExternalLink, Download} from "lucide-svelte";
	import { InputChip, Paginator } from "@skeletonlabs/skeleton";
	import type {PageData} from "./$types";
    import { page } from "$app/stores";
	import type { PaginationSettings } from "@skeletonlabs/skeleton/dist/components/Paginator/types";
	export let data;
    let input_choices: string[] = [];
    $: input_choices = $user_choice.casks.concat($user_choice.packages);
	let available_apps = data.apps.map(app => app.token);
    available_apps = available_apps.concat(data.packages.map(pkg => pkg.name));
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
    function removeChip(e: any) {
        user_choice.update(ch => {
            ch.casks = ch.casks.filter(cask => cask != e.detail.chipValue);
            ch.packages = ch.packages.filter(pkg => pkg != e.detail.chipValue);
            return ch;
        })
    }
    // const pagination: PaginationSettings = {
    //     offset: ,
    //     limit: ,
    //     size: ,
    //     amounts: ,
    // };
</script>

<InputChip
    bind:value={input_choices}
    whitelist={available_apps}
    allowDuplicates={false}
    on:remove={removeChip}
    name="inp" />

    <!-- <Paginator bind:settings={pagination} /> -->
    <p>apps length {data.apps.length}</p>
    <p>pkg length {data.packages.length}</p>
    <p>pagination {$page.url.searchParams.get("p") || "0"}</p>
    <p>ch: {input_choices}</p>
<main>
    <div class="container">
        {#each data.apps as cask}
            <button
                class={`${$user_choice.casks.includes(cask.token) ?
                    "card-variant-filled-primary" : "card variant-glass-primary"}
                    card-hover`}
                on:click={toggleBrew}
                data-brewtype="cask"
                data-token={cask.token}
                data-chosen={$user_choice.casks.includes(cask.token)}
                >
                <div class="card-header">
                    <h1>{cask.name[0]}
                        <a href={cask.homepage} target="_blank" title={cask.name + " homepage as reported by brew.sh"}>
                            <ExternalLink style="display: inline" size={18}/>
                        </a>
                        <span
                            style="float: inline-end;"
                            class="badge variant-filled-primary"
                            title="Downloads in the past 90 days">
                            {cask.analytics.install["90d"][cask.token]}
                            <Download style="display: inline" size={18} />
                        </span>
                    </h1>
                </div>
                <p>{cask.desc}</p>
            </button>
        {/each}
    </div>
    <div class="container">
        {#each data.packages as pkg}
            <button
                class={`${$user_choice.packages.includes(pkg.name) ?
                    "card-variant-filled-secondary" : "card variant-glass-secondary"}
                    card-hover`}
                on:click={toggleBrew}
                data-brewtype="formula"
                data-token={pkg.name}
                data-chosen={$user_choice.packages.includes(pkg.name)}
                >
                <div class="card-header">
                    <h1>{pkg.name}
                        <a href={pkg.homepage} target="_blank" title={pkg.name + " homepage as reported by brew.sh"}>
                            <ExternalLink style="display: inline" size={18}/>
                        </a>
                        <span
                            style="float: inline-end;"
                            class="badge variant-filled-primary"
                            title="Downloads in the past 90 days">
                            {pkg.analytics.install_on_request["90d"][pkg.name]}
                            <Download style="display: inline" size={18} />
                        </span>
                    </h1>
                </div>
                <p>{pkg.desc}</p>
            </button>
        {/each}
    </div>
</main>
<style>
    main {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
	.container {
		display: flex;
		flex-flow: row wrap;
		gap: 2.5rem;
		margin: 1rem 2rem;
	}
	.card {
		padding: .25rem;
	}
	.card-header {
		padding: .25rem 1rem;
	}
</style>