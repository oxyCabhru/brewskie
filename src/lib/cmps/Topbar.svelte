<script lang="ts">
  import { page } from "$app/stores";
  let breadcrumbs: string[];
  $: breadcrumbs = $page.route.id?.split("/").filter((v) => v != "") || [];
</script>

<div class="flex flex-row justify-between w-full">
  <div>
    <h1 class="text-3xl">Brewskie 🤙</h1>
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
        More brews
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
