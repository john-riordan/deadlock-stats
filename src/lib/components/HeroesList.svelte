<script lang="ts">
	import { resolve } from '$app/paths';

	import { getHeroes } from '$lib/api/static.remote';

	let { version }: { version: number } = $props();

	let heroes = $derived(await getHeroes({ language: 'english', clientVersion: version }));
</script>

{#if heroes.success}
	<h1>Heroes</h1>
	<!-- <pre>{JSON.stringify(heroes.output, null, 2)}</pre> -->
	{#each heroes.output as hero (hero.id)}
		<a href={resolve(`/heroes/${hero.id}`)}>
			<h2>{hero.name}</h2>
			<img src={hero.images.minimap_image} alt={hero.name} />
		</a>
	{/each}
{:else}
	<!-- <pre>{JSON.stringify(heroes, null, 2)}</pre> -->
{/if}
