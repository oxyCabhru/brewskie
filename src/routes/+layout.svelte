<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { AppShell, Toast, Modal, storePopup, Drawer } from '@skeletonlabs/skeleton';
	import { active_drawer, lang, user_choice } from '$lib/store';
	import locale from "$lib/localization";
	import { Info } from 'lucide-svelte';
	import Sixpacks from '$lib/components/Sixpacks.svelte';
	import { openAbout } from '$lib/functions';
	import Selected from '$lib/components/Selected.svelte';
	import { onMount } from 'svelte';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	onMount(() => {
		lang.subscribe(lang => {
			document.documentElement.dir = lang == "he" ? "rtl" : "ltr";
		})
	})
</script>
<svelte:head>
	<title>
		{$locale.title.brewskie[$lang]} {($user_choice.casks.length > 0 || $user_choice.packages.length > 0) ? `| ${
			$user_choice.casks.length == 1 ?
			$locale.title.cask[$lang]
			:
			`${$user_choice.casks.length} ${$locale.title.casks[$lang]}`
		} | ${
			$user_choice.packages.length == 1 ?
			$locale.title.pkg[$lang]
			:
			`${$user_choice.packages.length} ${$locale.title.pkgs[$lang]}`
		}` : "" }
	</title>
</svelte:head>
<Modal />
<Drawer>
	{#if $active_drawer == "sixpacks"}
	<Sixpacks />
	{:else if $active_drawer == "selections"}
	<Selected />
	{/if}
</Drawer>
<AppShell>
	<Toast buttonDismiss="hidden" background="variant-glass-secondary" />
	<div class="header">
		<h1 class="h1"><span class="gradient-heading primary-gr">
			{$locale.title.brewskie[$lang]}</span><br>{$locale.title.desc[$lang]}
			<a href="https://brew.sh" class="font-medium gradient-heading secondary-gr hover:underline">
				Homebrew.
			</a>
		</h1>
		<div class="icons flex flex-col">
			<button class="btn text-secondary-600 flex flex-col" title="About.." on:click={openAbout}>
				<Info />
				{$locale.about[$lang]}
			</button>
		</div>
	</div>
	<slot />
</AppShell>

<style>
	.header {
		margin: 0.5rem;
		padding: 0 0.5rem;
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		justify-content:space-between;
		align-items: center;
	}
</style>