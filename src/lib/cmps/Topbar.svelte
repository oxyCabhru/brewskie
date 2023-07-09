<script lang="ts">
    import locale from "$lib/localization";
    import { lang } from "$lib/user_prefs";
</script>

<h1 class="text-3xl">
    {$locale.title.brewskie[$lang]}
</h1>
<h2 class="text-xl opacity-70">
    {$locale.title.desc[$lang]}
    <a class="link" href="https://brew.sh">Homebrew</a>.
</h2>
