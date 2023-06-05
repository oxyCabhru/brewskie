<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { AppShell, Toast, Modal, storePopup } from '@skeletonlabs/skeleton';
	import { openAbout } from '$lib/store';
	import { Info } from 'lucide-svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
			
</script>
<Modal />
<AppShell>
	<Toast buttonDismiss="hidden" background="variant-glass-secondary" />
	<div class="header">
		<h1>Brewskie! 🤙<br>Install apps and packages quickly and easily, powered by 
			<a href="https://brew.sh" class="font-medium text-secondary-600 dark:text-secondary-500 hover:underline">
				Homebrew.
			</a>
		</h1>
		<button class="btn text-secondary-600 p-2" on:click={openAbout}>
			<Info />
		</button>
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
	}
</style>