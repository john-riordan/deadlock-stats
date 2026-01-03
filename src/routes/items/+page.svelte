<script lang="ts">
	import { getItemsByType, getVersions } from '$lib/api/static.remote';

	let versions = await getVersions();

	let items = $derived(
		await getItemsByType({
			type: 'weapon',
			language: 'english',
			clientVersion: versions.success ? versions.output[0] : 6071
		})
	);

	$inspect(items);
</script>

{#if items.success}
	<h1>Items</h1>
	<pre>{JSON.stringify(items.output, null, 2)}</pre>
{:else}
	<h1>Items not found</h1>
{/if}
