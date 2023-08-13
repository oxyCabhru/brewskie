<script lang="ts">
  import { selected_brews, toggle_brew } from "$lib/selected_brews";
  import { BrewType, type BrewMetadata } from "$lib/types";
  export let brew: BrewMetadata;
  let icon_url: string;
  if (brew.icon) {
    icon_url = URL.createObjectURL(
      new Blob([Buffer.from(brew.icon, "base64")])
    );
  }
  const type: "cask" | "formula" =
    brew.type == BrewType.Cask ? "cask" : "formula";
  const token = brew.token.sanitized;
  let selected: boolean;
  $: selected =
    brew.type == BrewType.Cask
      ? $selected_brews.casks.includes(token)
      : $selected_brews.formulae.includes(token);
</script>

<button
  class="card card-compact shadow-xl w-min lg:w-fit rounded-2xl"
  data-selected={selected}
  data-type={type}
  data-token={token}
  on:click={(e) => toggle_brew(e, token, type)}
>
  <div class="card-body">
    <div class="card-title">
      <div class="flex flex-row items-center gap-2 relative">
        <span class="brew-icon">
          {#if brew.icon}
            <img
              alt={`${brew.homepage} favicon`}
              src={icon_url}
              width="16"
              height="16"
            />
          {:else}
            <ion-icon name="logo-github" />
          {/if}
        </span>
        <a
          href={brew.homepage}
          target="_blank"
          class={`hover-link truncate flex flex-col text-left ${
            brew.type == BrewType.Cask ? "raw-token" : ""
          }`}
          data-token-raw={brew.token.raw}
        >
          <span id="dni">
            {brew.display_name}
            <ion-icon name="link-outline" class="i" />
          </span>
        </a>
      </div>
      <div class="ml-auto flex gap-2">
        {#if !["NaN", 0].includes(brew.installs)}
          <span class="badge badge-outline">
            <ion-icon name="arrow-down-outline" />
            {brew.installs}
          </span>
        {/if}
        <button
          class="toggle-brew badge badge-outline whitespace-nowrap"
          data-selected={selected}
        >
          {selected ? "- Unselect" : "+ Select"}
        </button>
      </div>
    </div>
  </div>
  <div class="p-4 pt-0">
    <p>
      {brew.description}
    </p>
  </div>
</button>

<style>
  .card {
    border: solid rgba(0, 0, 0, 0.4) 1px;
    background: var(--brew-sh-bg);
    flex-grow: 1;
    transform: scale(1);
    transition: transform 80ms ease-in-out, background 80ms ease-in-out;
  }
  .card[data-selected="true"] {
    background: var(--brew-sh-alt-bg);
  }
  .card:hover {
    z-index: 1;
    transform: scale(1.025);
  }
  .card:active {
    transform: scale(1.05);
  }
  a.hover-link ion-icon {
    transform: translateX(-2.5px);
    opacity: 0;
    transition: transform 200ms ease-out, opacity 130ms linear;
  }
  a.hover-link:hover ion-icon,
  a.hover-link:focus ion-icon {
    transform: translateX(0);
    opacity: 1;
  }
  a.hover-link.raw-token::after {
    content: attr(data-token-raw);
    opacity: 0;
    height: 0;
    transition: opacity 150ms ease-in, height 150ms ease-in;
  }
  a.hover-link.raw-token:hover::after,
  a.hover-link.raw-token:focus::after {
    opacity: 0.5;
    height: 1.75rem;
  }
  .toggle-brew {
    font-weight: bold;
    color: var(--brew-sh-primary);
    transition: color 80ms ease-in;
  }
  .toggle-brew[data-selected="true"] {
    color: var(--brew-sh-link);
  }
  .toggle-brew:hover {
    color: var(--brew-sh-link-h);
  }
</style>
