<script lang="ts">
  import { page } from "$app/stores";
  import Search from "./Search.svelte";
  const sum = $page.data.casks.total_items + $page.data.formulae.total_items;
  let pagination: number;
  let count: number;
  $: pagination = Number($page.url.searchParams.get("page") || 1);
  $: count = Number($page.url.searchParams.get("count") || 15);

  function toggle_view() {
    const conts = Array.from(document.getElementsByClassName("controlled"));
    const opts = Array.from(document.getElementsByClassName("opt"));
    [...conts, ...opts].forEach((el) => el.classList.toggle("active"));
  }

  let search_status: boolean = false;
  const search_on = () => (search_status = !search_status);
</script>

<div
  class="browse-bar lg:rounded-2xl py-2 shadow-xl lg:px-14 lg:py-4 lg:mx-4 lg:mt-4 relative"
>
  <Search on={search_status} />
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
      title={`${$page.data.stream.casks.length} casks & ${$page.data.stream.formulae.length} formulae`}
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
    border: solid rgba(0, 0, 0, 0.4) 1px;
    background: var(--brew-sh-bg);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 1rem;
    justify-content: space-around;
    user-select: none;
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
