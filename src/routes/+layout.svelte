<script lang="ts">
    import { fetch_cask_api } from '$lib/brew_sh';
    import type {LayoutData} from './$types';
    export let data;
</script>

{JSON.stringify(data.test)}
{JSON.stringify(data.test2)}
<slot />