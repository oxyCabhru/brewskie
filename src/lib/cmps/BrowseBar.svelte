<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
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
  let search_btn: EventTarget | null;
  let search_bar: EventTarget | null;
  function search_on() {
    document
      .getElementsByClassName("search-bar")[0]
      .classList.remove("invisible");
    if (document.body.getAttribute("search")) return;
    document.body.addEventListener("keydown", (e) => {
      const bar = document.getElementsByClassName("search-bar")[0];
      if (e.code != "Escape" || e.key != "Escape") return;
      bar.classList.add("invisible");
    });
    document.body.setAttribute("search", "true");
  }
</script>

<div
  class="browse-bar lg:rounded-2xl px-14 shadow-xl lg:px-2 lg:py-4 lg:mx-4 lg:mt-4 relative"
>
  <div
    id="search-bar"
    class="search-bar rounded-2xl overflow-hidden w-full h-full absolute invisible"
    bind:this={search_bar}
  >
    <input type="text" class="rounded w-full" />
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
        <ion-icon bind:this={search_btn} name="search-outline" />
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
  .browse-bar {
    isolation: isolate;
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
    background: var(--brew-sh-alt-bg);
    padding: 2rem 1rem;
  }
  .search-bar input {
    height: 3rem;
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
  }

  .active.opt {
    opacity: 1;
    pointer-events: none;
    cursor: default;
  }
</style>
