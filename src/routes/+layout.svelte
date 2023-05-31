<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { write_brewfile } from "$lib/bundle";
	import type { UserChoices } from "$lib/types";
	import { user_choice } from '$lib/store';
</script>

<AppShell>
	<button on:click={() => console.log(write_brewfile($user_choice))}>click me</button>
	<slot />
</AppShell>