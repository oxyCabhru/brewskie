<script lang="ts">
  import { selected_brews } from "$lib/selected_brews";
  import type { SelectedBrews } from "$lib/types";
  import debounce from "lodash.debounce";
  let input_qs: HTMLInputElement;
  let quickstart: string;
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
  <div>
    <div class="input-group input-group-sm mx-16">
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
  Welcome to Brewskie, a tool for getting started with a new machine,
  not-too-unlike <a
    class="underline"
    href="https://ninite.com/"
    target="_blank"
  >
    Ninite
  </a> but now-- for macOS!
</p>

<slot />

<style>
  input {
    width: calc(8ch * 1.4);
  }
</style>
