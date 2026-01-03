<script lang="ts">
	import { getVersions } from '$lib/api/static.remote';
	import HeroesList from '$lib/components/HeroesList.svelte';

	const versions = await getVersions();
</script>

{#if versions.success}
	<h1>Versions</h1>
	<pre>{JSON.stringify(versions, null, 2)}</pre>

	<HeroesList version={versions.output[0]} />
{/if}
