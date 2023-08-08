<script lang="ts">
  import type { PageData } from "./$types";
  import Category from "$lib/cmps/Category.svelte";
  export let data;
</script>

<div class="flex flex-row gap-2">
  <div class="grid gap-2 m-4 w-fit">
    {#each data.categories_stream as category}
      <Category {category} />
    {/each}
  </div>
</div>
