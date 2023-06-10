<script lang="ts">
	import { clearAll } from "$lib/functions";
    import locale from "$lib/localization";
    import { user_choice, lang } from "$lib/store";
	import { CopyX, X } from "lucide-svelte";
	import { fly } from "svelte/transition";
    $: input_choices = $user_choice.casks.concat($user_choice.packages);
    function removeChip(e: any) {
        let value = e.target.outerText || e.target.parentElement.outerText
        user_choice.update(ch => {
            ch.casks = ch.casks.filter(cask => cask != value);
            ch.packages = ch.packages.filter(pkg => pkg != value);
            return ch;
        })
    }
</script>

<div class="p-1">
    {#if input_choices.length > 0}
    <h1 class="h1 text-center">
        {$locale.some_brews_selected[$lang]}
    </h1>
    <button class="btn variant-filled-warning flex flex-row gap-2 mt-4 w-full"
        on:click={clearAll}>
        <CopyX />
        {$locale.clear_all_selected[$lang]}
    </button>
    {:else}
    <h1 class="h1 text-center">
        {$locale.no_brews_selected[$lang]}
    </h1>
    {/if}
    <div class="brews m-2 flex flex-row flex-wrap gap-2">
        {#each input_choices as brew}
        <button
            on:click={removeChip}
            transition:fly
            class="badge variant-filled flex flex-flow gap-1 justify-between">
            {brew}
            <X color="red" size="12" />
        </button>
        {/each}
    </div>
</div>