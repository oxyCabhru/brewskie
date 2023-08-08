<script lang="ts">
  import { toggle_brew } from "$lib/selected_brews";
  import debounce from "lodash.debounce";
  import { onMount } from "svelte";
  export let on: boolean;
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
        search_results = [];
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
  $: on ? search_on() : null;
  let search_input: HTMLInputElement;
  let search_value: string;
  let search_results: {
    type: "cask" | "formula";
    token: string;
    api: Promise<Response>;
  }[] = [];
  async function search() {
    if (search_value.trim() == "") {
      search_results = [];
      return;
    }
    const found: { type: "cask" | "formula"; brew: string }[] = await (
      await fetch("../query", {
        method: "POST",
        body: JSON.stringify({
          query: search_value,
        }),
      })
    ).json();
    let sr = found
      .filter((val) => !val.brew.includes("/font"))
      .slice(0, 10)
      .map(async (val) => {
        return {
          type: val.type,
          token: val.brew,
          api: fetch(`../query?token=${val.brew}&type=${val.type}`),
        };
      });
    search_results = await Promise.all(sr);
  }
</script>

<div
  id="search-bar"
  class="search-bar rounded-2xl overflowx-hidden w-full h-full absolute"
  bind:this={search_bar}
>
  <input
    type="text"
    class="rounded w-full"
    placeholder="Press [esc] to flip back, WIP!"
    on:input={debounce(search, 300)}
    bind:this={search_input}
    bind:value={search_value}
  />
</div>
<div class="search-results">
  <ul>
    {#each search_results as brew}
      <li class="card shadow-xl">
        <button
          class="px-2"
          on:click={(e) => toggle_brew(e, brew.token, brew.type)}
        >
          {#await brew.api}
            <span class="loading loading-bars loading-xs" />
          {:then api}
            {#await api.json() then json}
              {json.display_name}
              <span class="opacity-50">
                {json.description}
              </span>
            {/await}
          {/await}
        </button>
      </li>
    {/each}
  </ul>
</div>

<!-- TODO: redesign the entire component x)  -->

<style>
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
    pointer-events: auto;
    padding: 0.25rem 1rem;
  }
  :global(.search-results ul li) {
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
</style>
