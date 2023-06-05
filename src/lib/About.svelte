<script lang="ts">
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
	import { ExternalLink, Github, HelpCircle } from "lucide-svelte";
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
        Brewskie uses your browser's local storage for keeping your selections between page loads.
    </p>
    <a class="inline-flex items-center gap-1 font-medium text-secondary-600 dark:text-secondary-500 hover:underline" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API#web_storage_concepts_and_usage" target="_blank">
    For more information on localStorage
    <ExternalLink size="16" />
    <div class="arrow bg-surface-100-800-token" />
    </a>
</div>

<div class="card pr-4 pl-4 pb-4">
    <div class="card-header">
        <h1 class="text-3xl">Brewskie</h1>
        <p class="text-white/50">Install apps and packages quickly and easily, powered by Homebrew.</p>
    </div>
    <p>
        Welcome to Brewskie, a tool for quickly and easily getting started with a new machine, not-too-unlike
        <a class="font-medium text-secondary-600 dark:text-secondary-500 hover:underline" href="https://ninite.com/" target="_blank">
            Ninite
        </a>
        but now-- for macOS!
    </p>

    <h3 class="text-xl">How to use:</h3>
        <ol class="list-decimal pl-8">
            <li>
                <span class="text-secondary-500">
                    Select apps and packages you'd like to install.
                </span>
                <p class="text-white/60">
                    Alternatively, you can also search for them in the search bar. On desktop, little chips will appear and show the name of the Brew token of the corresponding cask or formula.
                    Selections will persist between uses of the site.
                    <button class="text-secondary-500" use:popup={localstorageExplain}>
                        <HelpCircle size="16" />
                    </button>
                </p>
            </li>
            <li>
                <span class="text-secondary-500">
                    Download the script and review it!
                </span>
                <p class="text-white/60">
                    Press the orange <span class="text-primary-600">Done</span> button to download the script.
                    I strongly encourage you to read its contents before running it, make sure you understand what you run, and stop if you don't feel comfortable with running it.
                    The script installs Homebrew if your machine doesn't have it already,
                    writes a <span class="text-secondary-700">brewfile</span> into /tmp/brewskie,
                    and attempts to run it using
                    <a class="text-tertiary-600 inline-flex items-center gap-1 font-medium hover:underline" href="https://docs.brew.sh/Manpage#bundle-subcommand">
                        brew bundle --file=/tmp/brewskie
                        <ExternalLink size="16" />
                    </a>
                </p>
            </li>
            <li>
                <span class="text-secondary-500">
                    Make the script executable and run it!
                </span>
                <p class="text-white/60">
                    By default, you can't run the script after downloading it --
                    you have to expressly make it executable.
                    This is mainly a security measure, and we are all grateful for it.
                    <a class="inline-flex items-center gap-1 font-medium text-tertiary-600 hover:underline" href="https://support.apple.com/en-gb/guide/terminal/apdd100908f-06b3-4e63-8a87-32e71241bab4/mac" target="_blank">
                        Please follow Apple's instructions for making a script executable.
                        <ExternalLink size="16" />
                    </a><br>
                    Run it as per the instructions, follow the prompts, and within a few minutes you should have all of your selected Brews installed! 
                </p>
            </li>
        </ol>
        <div class="card-footer inline-flex gap-2 justify-between w-full pr-6">
            <span>
                Made by Daniel Moshe 🤓
            </span>
            <a href="https://github.com/oxyCabhru/brewskie" target="_blank">
                <button class="btn-icon btn-icon-sm variant-ghost-secondary">
                    <Github size="16" />
                </button>
            </a>
        </div>
</div>

<style>
    .card {
        position: relative;
        overflow-y: auto;
        height: 70vh;
    }
    .card-footer > span {
        opacity: 40%;
    }
</style>