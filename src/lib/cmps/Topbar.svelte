<script lang="ts">
  import { page } from "$app/stores";
  export let breadcrumbs: string[];
</script>

<div class="flex flex-row justify-between w-full">
  <div>
    <h1 class="lg:text-3xl text-l">
      Brewskie 🤙
      <p class="text-white/50 hidden lg:block">
        Install apps and packages quickly and easily, powered by Homebrew.
      </p>
    </h1>
    {#if breadcrumbs.length > 0}
      <div class="flex flex-col">
        <div class="breadcrumbs opacity-70">
          <ul>
            <li>
              <a href="/">
                <ion-icon name="beer-outline" class="i" />
              </a>
            </li>
            {#each breadcrumbs as breadcrumb}
              <li>
                {breadcrumb}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {:else}
      <a class="badge badge-outline p-2 opacity-70" href="/browse">
        Browse popular brews
      </a>
    {/if}
  </div>
  <div class="opacity-50 flex flex-col items-center">
    <a href="https://github.com/oxyCabhru/brewskie">
      <ion-icon name="logo-github" class="i" />
      {$page.data.build_data.revision.slice(0, 7)}
    </a>
    <span>
      {$page.data.build_data.db_status}
    </span>
  </div>
</div>
