<script lang="ts">
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
	import { ExternalLink, Github, HelpCircle } from "lucide-svelte";
    import locale from "$lib/localization";
    import { lang } from "$lib/store";
    const localstorageExplain: PopupSettings = {
        event: "click",
        target: "localstorageExplain",
        placement:"bottom",
    }
</script>
<div
    class="alert-message variant-glass-secondary w-fit p-1 mb-2"
    data-popup="localstorageExplain">
    <p>
        {$locale.about_content.localstorage_explain[$lang]}
    </p>
    <a class="inline-flex items-center gap-1 font-medium text-secondary-600 dark:text-secondary-500 hover:underline" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API#web_storage_concepts_and_usage" target="_blank">
        {$locale.about_content.localstorage_link[$lang]}
        <ExternalLink size="16" />
    <div class="arrow bg-surface-100-800-token" />
    </a>
</div>

<div class="card pr-4 pl-4 pb-4">
    <div class="card-header">
        <h1 class="h1">
            {$locale.title.brewskie[$lang]}
        </h1>
        <p class="text-white/50">
            {$locale.title.desc[$lang]}Homebrew.
        </p>
    </div>
    <p>
        {$locale.about_content.welcome[$lang]}
        <a class="font-medium text-secondary-600 dark:text-secondary-500 hover:underline" href="https://ninite.com/" target="_blank">
            Ninite
        </a>
        {$locale.about_content.welcome_now[$lang]}
    </p>

    <h3 class="h3 text-xl">
        {$locale.about_content.how_to.title[$lang]}
    </h3>
        <ol class="list-decimal pl-8">
            <li>
                <span class="text-secondary-500">
                    {$locale.about_content.how_to.step1.title[$lang]}
                </span>
                <p class="text-white/60">
                    {$locale.about_content.how_to.step1.detail[$lang]}
                    <button class="text-secondary-500" use:popup={localstorageExplain}>
                        <HelpCircle size="16" />
                    </button>
                </p>
            </li>
            <li>
                <span class="text-secondary-500">
                    {$locale.about_content.how_to.step2.title[$lang]}
                </span>
                <p class="text-white/60">
                    {$locale.about_content.how_to.step2.detail_1[$lang]}<span class="text-primary-600">{$locale.download_brewfile[$lang]}</span>
                    {$locale.about_content.how_to.step2.detail_2[$lang]}
                    <span class="text-secondary-700">brewfile</span>
                    {$locale.about_content.how_to.step2.detail_3[$lang]}
                    <a class="text-tertiary-600 inline-flex items-center gap-1 font-medium hover:underline" href="https://docs.brew.sh/Manpage#bundle-subcommand">
                        brew bundle --file=/tmp/brewskie
                        <ExternalLink size="16" />
                    </a>
                </p>
            </li>
            <li>
                <span class="text-secondary-500">
                    {$locale.about_content.how_to.step3.title[$lang]}
                </span>
                <p class="text-white/60">
                    {$locale.about_content.how_to.step3.detail_1[$lang]}
                    <a class="inline-flex items-center gap-1 font-medium text-tertiary-600 hover:underline" href={`${$locale.about_content.how_to.step3.link[$lang]}`} target="_blank">
                        {$locale.about_content.how_to.step3.link_desc[$lang]}
                        <ExternalLink size="16" />
                    </a><br>
                    {$locale.about_content.how_to.step3.detail_2[$lang]}
                </p>
            </li>
        </ol>
        <div class="card-footer inline-flex gap-2 justify-between w-full pr-6">
            <span>
                {$locale.about_content.credit[$lang]}
            </span>
            <a href="https://github.com/oxyCabhru/brewskie" target="_blank">
                <button class="btn-icon btn-icon-sm variant-ghost-secondary">
                    <Github size="16" />
                </button>
            </a>
        </div>
</div>

<style>
    .alert-message {
        z-index: 1000;
    }
    .card {
        position: relative;
        overflow-y: auto;
        height: 70vh;
    }
    .card-footer > span {
        opacity: 40%;
    }
</style>