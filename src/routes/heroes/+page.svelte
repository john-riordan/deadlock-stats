<script lang="ts">
	import { getVersions } from '$lib/api/static.remote';
	import HeroesList from '$lib/components/HeroesList.svelte';

	let versions = await getVersions();
</script>

{#if versions.success}
	<HeroesList version={versions.output[0]} />
{:else}
	<h1>Heroes not found</h1>
{/if}
