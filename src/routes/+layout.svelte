<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { AppShell, Toast, Modal, storePopup, Drawer, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import { openAbout, user_choice } from '$lib/store';
	import { Beer, Info } from 'lucide-svelte';
	import Sixpacks from '$lib/Sixpacks.svelte';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	const view_sixpacks = () => drawerStore.open({
			bgDrawer: 'bg-secondary-900 text-white',
			bgBackdrop: 'bg-gradient-to-tr from-tertiary-500/50 via-secondary-500/50 to-primary-500/50',
			width: 'w-[280px] md:w-[480px]',
			padding: 'p-4',
			rounded: 'rounded-xl',
		});
</script>
<svelte:head>
	<title>
		Brewskie {($user_choice.casks.length > 0 || $user_choice.packages.length > 0) ? `| ${$user_choice.casks.length} Casks | ${$user_choice.packages.length} Formulae` : "" }
	</title>
</svelte:head>
<Modal />
<Drawer><Sixpacks /></Drawer>
<AppShell>
	<Toast buttonDismiss="hidden" background="variant-glass-secondary" />
	<div class="header">
		<h1 class="h1"><span class="gradient-heading primary-gr">Brewskie! 🤙</span><br>Install apps and packages quickly and easily, powered by 
			<a href="https://brew.sh" class="font-medium gradient-heading secondary-gr hover:underline">
				Homebrew.
			</a>
		</h1>
		<div class="icons flex flex-col">
			<button class="btn text-secondary-600" title="About.." on:click={openAbout}>
				<Info />
			</button>
			<button class="btn text-secondary-600" title="Premade Brewskies" on:click={view_sixpacks}>
				<Beer />
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