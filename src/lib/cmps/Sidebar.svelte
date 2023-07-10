<script lang="ts">
    import locale from "$lib/localization";
    import { lang } from "$lib/user_prefs";
    import { clear_brews, selected_brews } from "$lib/selected_brews";
    let brews: string[];
    $: brews = [...$selected_brews.casks, ...$selected_brews.formulae].sort();
</script>

<!-- <div>
    {$locale.about_content.welcome[$lang]}
    <a class="link" href="https://ninite.com">Ninite</a>
    {$locale.about_content.welcome_now[$lang]}
</div> -->
<button class="btn" on:click={clear_brews}>Clear selection</button>
<div class="my-2">
    <h1>Brews selected:</h1>
    <p class="flex gap-2 flex-row flex-wrap">
        {#each brews as brew}
            <span class="badge badge-outline whitespace-nowrap">
                {brew}
            </span>
        {/each}
    </p>
</div>
