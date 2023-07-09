<script lang="ts">
    import locale from "$lib/localization";
    import { lang } from "$lib/user_prefs";
    import { selected_brews } from "$lib/selected_brews";
</script>

{$locale.about_content.welcome[$lang]}
<a class="link" href="https://brew.sh">Homebrew</a>
{$locale.about_content.welcome_now[$lang]}
{JSON.stringify($selected_brews)}
<button
    class="btn"
    on:click={() => {
        selected_brews.set({ casks: [], formulae: [] });
    }}>Clear selection</button
>
