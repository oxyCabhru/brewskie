<script lang="ts">
  import { selected_brews } from "$lib/selected_brews";
  import type { SelectedBrews } from "$lib/types";
  import debounce from "lodash.debounce";
  import { onMount } from "svelte";
  let input_qs: HTMLInputElement;
  let quickstart: string;
  onMount(() => {
    input_qs.addEventListener("keypress", (e) => {
      if (e.key != "Enter") return;
      debounce(load_up, 300);
    });
  });
  async function load_up() {
    if (!quickstart) return;
    quickstart = quickstart.trim();
    try {
      const sb = (await (
        await fetch(`/query?hash=${quickstart}`)
      ).json()) as SelectedBrews;
      $selected_brews = sb;
      input_qs.classList.add("input-success");
      setTimeout(() => {
        input_qs.classList.remove("input-success");
      }, 3000);
      document.body.addEventListener(
        "click",
        () => {
          input_qs.classList.remove("input-success");
        },
        { once: true }
      );
    } catch {
      input_qs.classList.add("input-error");
      input_qs.addEventListener(
        "input",
        () => {
          input_qs.classList.remove("input-error");
        },
        { once: true }
      );
    }
  }
</script>

<div class="card-header mb-4 flex flex-col gap-1 items-center">
  <h1 class="h1 mr-auto">Brewskie! 🤙</h1>
  <p class="text-white/50">
    Install apps and packages quickly and easily, powered by Homebrew.
  </p>
  <div class="">
    <div class="input-group input-group-sm">
      <span class="uppercase">Quickstart</span>
      <input
        type="text"
        class="input input-bordered hover:input-warning input-sm"
        bind:this={input_qs}
        bind:value={quickstart}
      />
      <button
        class="btn btn-sm btn-square text-xl"
        on:click={debounce(load_up, 300)}
      >
        <ion-icon name="beer-outline" class="i" />
      </button>
    </div>
  </div>
</div>

<p>
  Welcome to Brewskie, a tool for quickly and easily getting started with a new
  machine, not-too-unlike <a
    class="font-medium text-secondary-600 dark:text-secondary-500 underline"
    href="https://ninite.com/"
    target="_blank">Ninite</a
  > but now-- for macOS!
</p>

<h3 class="h3 text-xl">How to use:</h3>

<ol class="list-decimal pl-8">
  <li class="collapse collapse-arrow">
    <input type="checkbox" name="howto" checked={false} />
    <span class="collapse-title text-secondary-500"
      >Select apps and packages you'd like to install.</span
    >
    <p class="collapse-content text-white/60">
      TODO!! Alternatively, you can also search for them in the search bar. On
      desktop, little chips will appear and show the name of the Brew token of
      the corresponding cask or formula. Selections will persist between uses of
      the site.
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API#web_storage_concepts_and_usage"
        >For more info..
        <ion-icon name="link-outline" class="i" />
      </a>
    </p>
  </li>
  <li class="collapse collapse-arrow">
    <input type="checkbox" name="howto" checked={false} />
    <span class="collapse-title text-secondary-500"
      >Download the script and review it!</span
    >
    <p class="collapse-content text-white/60">
      TODO!! Press the orange <span class="text-primary-600">Done!</span>
      button to download the script. I strongly encourage you to read its contents
      before running it, make sure you understand what you run, and stop if you don't
      feel comfortable with running it. The script installs Homebrew if your machine
      doesn't have it already, writes a
      <span class="text-secondary-700">brewfile</span>
      into /tmp/brewskie, and attempts to run it using
      <a
        class="text-tertiary-600 inline-flex items-center gap-1 font-medium hover:underline"
        href="https://docs.brew.sh/Manpage#bundle-subcommand"
        >brew bundle --file=/tmp/brewskie <ion-icon name="link-outline" /></a
      >
    </p>
  </li>
  <li class="collapse collapse-arrow">
    <input type="checkbox" name="howto" checked={false} />
    <span class="collapse-title text-secondary-500"
      >Make the script executable and run it!</span
    >
    <p class="collapse-content text-white/60">
      TODO!! By default, you can't run the script after downloading it -- you
      have to expressly make it executable. This is mainly a security measure,
      and we are all grateful for it. <a
        class="inline-flex items-center gap-1 font-medium text-tertiary-600 hover:underline"
        href="https://support.apple.com/en-gb/guide/terminal/apdd100908f-06b3-4e63-8a87-32e71241bab4/mac"
        target="_blank"
        >Please follow Apple's instructions for making a script executable.
        <ion-icon name="link-outline" class="i" />
      </a><br /> Run it as per the instructions, follow the prompts, and within a
      few minutes you should have all of your selected Brews installed!
    </p>
  </li>
</ol>

<style>
  input {
    width: calc(8ch * 1.4);
  }
  input[type="checkbox"] {
    width: 100%;
  }
</style>
