<script lang="ts">
	import { page } from '$app/state';

	import { getHero, getVersions } from '$lib/api/static.remote';

	let versions = await getVersions();

	let hero = $derived(
		await getHero({
			id: parseInt(page.params.id || '0'),
			language: 'english',
			clientVersion: versions.success ? versions.output[0] : 6071
		})
	);
</script>

{#if hero.success}
	<h1>{hero.output.name}</h1>
	<pre>{JSON.stringify(hero.output, null, 2)}</pre>
{:else}
	<h1>Hero not found</h1>
{/if}
