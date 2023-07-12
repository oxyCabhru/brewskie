<script lang="ts">
  import { page } from "$app/stores";
  import locale from "$lib/localization";
  import { lang } from "$lib/user_prefs";
  export let build_data: {
    db_status: string;
    revision: string;
  };
  let breadcrumbs: string[];
  $: breadcrumbs = $page.route.id?.split("/").filter((v) => v != "") || [];
</script>

<div class="flex flex-row justify-between w-full">
  <div>
    <h1 class="text-3xl">
      {$locale.title.brewskie[$lang]}
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
      <h2 class="text-xl opacity-70">
        {$locale.title.desc[$lang]}
        <a class="link" href="https://brew.sh">Homebrew</a>.
      </h2>
    {/if}
  </div>
  <div class="opacity-50 flex flex-col items-center">
    <span>{build_data.revision.slice(0, 7)}</span>
    <a href="https://github.com/oxyCabhru/brewskie">
      {build_data.db_status}
    </a>
  </div>
</div>
