<script lang="ts">
  import type { PageData } from "../$types";
  import Brew from "$lib/cmps/Brew.svelte";
  import BrowseBar from "$lib/cmps/BrowseBar.svelte";
  export let data;
</script>

<BrowseBar {data} />

<div id="controller" class="lg:px-2 lg:py-4">
  <div id="casks" class="w-full lg:w-auto controlled card active">
    <div
      class="container gap-2 lg:gap-4 lg:p-4 grid lg:flex lg:flex-row lg:flex-wrap"
    >
      {#each data.stream.casks as app}
        {#await app.api}
          <div class="is-loading card shadow">
            <div class="card-title">
              <span class="loading loading-spinner" />
              {app.token}
            </div>
          </div>
        {:then api_response}
          <Brew brew={api_response} />
        {:catch err}
          <error token={app.token} reason={err}>
            {app.token} metadata couldn't be loaded despite the sanitation of the
            token. This is usually due to the cask being only available via taps,
            which isn't yet(?) supported.
          </error>
        {/await}
      {/each}
    </div>
  </div>
  <div id="formulae" class="w-full lg:w-auto controlled card">
    <div
      class="container gap-2 lg:gap-4 lg:p-4 grid lg:flex lg:flex-row lg:flex-wrap"
    >
      {#each data.stream.formulae as pkg}
        {#await pkg.api}
          <div class="is-loading card shadow">
            <div class="card-title">
              <span class="loading loading-spinner" />
              {pkg.token}
            </div>
          </div>
        {:then api_response}
          <Brew brew={api_response} />
        {:catch err}
          <error token={pkg.token} reason={err}>
            {pkg.token} metadata couldn't be loaded despite the sanitation of the
            token. This is usually due to the formula being only available via taps,
            which isn't yet(?) supported.
          </error>
        {/await}
      {/each}
    </div>
  </div>
</div>

<style>
  .is-loading {
    opacity: 0.5;
  }
  error {
    display: none;
  }
  .extras ion-icon {
    visibility: visible;
  }
  /* .browse-bar {
        isolation: isolate;
        border: solid rgba(0, 0, 0, 0.4) 1px;
        background: var(--brew-sh-bg);
        display: flex;
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
        transform: translateY(-16px);
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
    } */
  #controller {
    isolation: isolate;
    position: relative;
  }
  .controlled {
    position: absolute;
    opacity: 0;
    z-index: -1;
    pointer-events: none;
    transform: translate(5rem, 1rem);
    transition: opacity 150ms ease-in-out, transform 150ms linear;
  }
  #controller > .active {
    opacity: 1;
    z-index: 1;
    pointer-events: auto;
    transform: translate(0, 0);
  }
</style>
