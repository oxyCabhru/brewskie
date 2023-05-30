<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, InputChip } from '@skeletonlabs/skeleton';
	import type {LayoutData} from "./$types";
	export let data;			
	const available_apps = data.apps.items.map(v => v.cask);

	import {ExternalLink, Download} from "lucide-svelte";
	import { write_brewfile } from "$lib/bundle";
	import type { UserChoices } from "$lib/types";
	import { brew_fetch_cask } from "$lib/brew_sh";
	import { user_choice } from '$lib/store';
	

	function toggleBrew(e: MouseEvent) {
		if (!e.currentTarget) return
		const target = e.currentTarget as HTMLButtonElement
		if (!target.dataset.token) return;
		const token = target.dataset.token
		if (!target.dataset.chosen) return;
		let chosen = target.dataset.chosen
		
		if (chosen == "true") {
			user_choice.update(val => {
				val.casks = val.casks.filter(el => el != token);
				return val;
			})
			chosen = "false"
		} else {
			user_choice.update(val => {
				val.casks.push(token);
				return val;
			})
			chosen = "true"
		}
	}
	function brewfile() {
		console.log($user_choice);
		const iterator = $user_choice.casks.values()
		let ch: UserChoices = {
			packages: [],
			casks: [],
		};
		while (ch.casks.length + ch.packages.length != $user_choice.casks.length) {
			Math.round(Math.random()) ?
				ch.casks.push(iterator.next().value)
				:
				ch.packages.push(iterator.next().value)
		};
		const bf = write_brewfile(ch);
		console.log(ch);
		console.log(bf);
	}
</script>

<AppShell>
	<slot />
	<InputChip bind:value={$user_choice.casks} whitelist={available_apps} allowDuplicates={false} name="casks" />
	<button on:click={brewfile}>click me</button>

	<div id="casks-container">
		{#each data.apps.items.slice(0, 10) as cask}
		{#await brew_fetch_cask(cask.cask) then app}
		{#if app}
			
		<button
			class={`${$user_choice.casks.includes(cask.cask) ?
				"card-variant-filled-primary" : "card variant-glass-primary"}
				card-hover`}
			on:click={toggleBrew}
			data-token={cask.cask}
			data-chosen={$user_choice.casks.includes(cask.cask)}
			>
			<div class="card-header">
				<h1>{app.name[0]}
					<a href={app.homepage} target="_blank">
						<ExternalLink style="display: inline" size={18}/>
					</a>
					<span
						style="float: inline-end;"
						class="badge variant-filled-primary"
						title="Downloads in the past 30 days">
						{cask.count}
						<Download style="display: inline" size={18} />
					</span>
				</h1>
			</div>
			<p>{app.desc}</p>
		</button>
		{/if}
		{:catch}
		oopsie?
		{/await}
		{/each}
	</div>
</AppShell>

<style>
	#casks-container {
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