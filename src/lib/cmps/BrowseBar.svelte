<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import debounce from "lodash.debounce";
  import { BrewType } from "$lib/types";
  export let data: any;
  const sum = data.casks.total_items + data.formulae.total_items;
  let pagination: number;
  let count: number;
  $: pagination = Number($page.url.searchParams.get("page") || 1);
  $: count = Number($page.url.searchParams.get("count") || 15);

  function toggle_view() {
    const conts = Array.from(document.getElementsByClassName("controlled"));
    const opts = Array.from(document.getElementsByClassName("opt"));
    [...conts, ...opts].forEach((el) => el.classList.toggle("active"));
  }

  let search_bar: HTMLDivElement;
  function search_on() {
    search_bar.classList.add("active");
    search_input.focus();
    if (search_bar.getAttribute("active")) return;

    document.body.addEventListener("keydown", (e) => {
      const bar = document.getElementById("search-bar");
      if (bar && (e.code == "Escape" || e.key == "Escape")) {
        bar.classList.remove("active");
        search_value = "";
        search_results.innerHTML = "";
      }
    });
    search_bar.setAttribute("active", "true");
  }
  onMount(() => {
    document.body.addEventListener("keydown", (e) => {
      if ((e.code == "KeyK" || e.key == "K") && e.ctrlKey) {
        e.preventDefault();
        search_on();
      }
    });
  });

  let search_input: HTMLInputElement;
  let search_results: HTMLUListElement;
  let search_value: string;
  async function search() {
    if (search_value.trim() == "") {
      search_results.innerHTML = "";
      return;
    }
    const found: { type: string; brew: string }[] = await (
      await fetch("../query", {
        method: "POST",
        body: JSON.stringify({
          query: search_value,
        }),
      })
    ).json();
    found.forEach((brew) => {
      let node = document.createElement("li");
      node.classList.add("card");
      node.classList.add("shadow-xl");
      node.innerText = brew.brew;
      search_results.appendChild(node);
    });
  }
</script>

<div
  class="browse-bar lg:rounded-2xl py-2 shadow-xl lg:px-14 lg:py-4 lg:mx-4 lg:mt-4 relative"
>
  <div
    id="search-bar"
    class="search-bar rounded-2xl overflowx-hidden w-full h-full absolute"
    bind:this={search_bar}
  >
    <input
      type="text"
      class="rounded w-full"
      placeholder="Press [esc] to flip back"
      on:input={debounce(search, 200)}
      bind:this={search_input}
      bind:value={search_value}
    />
  </div>
  <div class="search-results">
    <ul bind:this={search_results} />
  </div>
  <button class="active opt" on:click={toggle_view}>
    <p>Casks</p>
    <p class="hidden lg:block">Your typical applications.</p>
  </button>
  <div
    class="extras text-xl flex flex-col place-content-center place-items-center"
  >
    <div class="flex gap-2">
      <a href={`?page=${pagination <= 1 ? 1 : pagination - 1}`}>
        <ion-icon name="caret-back-outline" />
      </a>
      <button on:click={search_on}>
        <ion-icon name="search-outline" />
      </button>
      <a href={`?page=${pagination + 1}`}>
        <ion-icon name="caret-forward-outline" />
      </a>
    </div>
    <div
      title={`${data.stream.casks.length} casks & ${data.stream.formulae.length} formulae`}
    >
      {#key pagination}
        <span>
          {(pagination - 1) * count * 2} - {pagination * count * 2}
        </span>
        <span style="color: var(--brew-sh-link)">/ {sum}</span>
      {/key}
    </div>
  </div>
  <button class="opt" on:click={toggle_view}>
    <p>Formulae</p>
    <p class="hidden lg:block">
      Command-line tools, applications, and runtimes.
    </p>
  </button>
</div>

<style>
  .extras ion-icon {
    visibility: visible;
  }
  .extras ion-icon:hover {
    color: var(--brew-sh-link-h);
  }
  .browse-bar {
    /* isolation: isolate; */
    border: solid rgba(0, 0, 0, 0.4) 1px;
    background: var(--brew-sh-bg);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 1rem;
    justify-content: space-around;
    user-select: none;
  }
  .search-bar {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 1rem;
    transform: rotate3d(1, 0, 0, 90deg);
    transition: transform 180ms ease-in-out;
  }
  .search-results {
    outline: 1px solid red;
    z-index: 2;
    position: absolute;
    top: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    text-align: center;
    pointer-events: none;
  }
  .search-results ul {
    /* outline: 3px solid cyan; */
    pointer-events: auto;
  }
  :global(.search-results ul li) {
    /* outline: 1px solid yellow; */
    border: solid rgba(0, 0, 0, 0.4) 1px;
    background: var(--brew-sh-bg);
  }
  :global(.search-results ul li + li) {
    margin-top: 0.25rem;
  }
  :global(.search-bar.active) {
    transform: rotate3d(0, 0, 0, 0) !important;
  }
  .search-bar input {
    height: 3.25rem;
    padding: 0.25rem 0.5rem;
  }
  .opt {
    opacity: 0.5;
    transition: opacity 150ms ease-in-out;
    pointer-events: auto;
    cursor: pointer;
  }
  .opt:hover {
    color: var(--brew-sh-link-h);
    border: 1px solid var(--brew-sh-link-h);
  }

  .active.opt {
    opacity: 1;
    pointer-events: none;
    cursor: default;
  }
</style>
