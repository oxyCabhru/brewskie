<script lang="ts">
  import type { PageData } from "./$types";
  import Category from "$lib/cmps/Category.svelte";
  export let data;
</script>

<div class="grid gap-2 m-4">
  {#each data.categories_stream as category}
    <Category {category} />
  {/each}
</div>
