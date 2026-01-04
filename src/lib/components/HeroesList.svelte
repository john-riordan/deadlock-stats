<script lang="ts">
	import { resolve } from '$app/paths';

	import { getHeroes } from '$lib/api/static.remote';

	let { version }: { version: number } = $props();

	let heroes = $derived(await getHeroes({ language: 'english', clientVersion: version }));
</script>

{#if heroes.success}
	<div class="grid">
		{#each heroes.output as hero (hero.id)}
			<a href={resolve(`/heroes/${hero.id}`)}>
				<img
					src={hero.images.top_bar_vertical_image_webp}
					alt={hero.name}
					width={100}
					height={100}
				/>
				<h2>{hero.name}</h2>
			</a>
		{/each}
	</div>
{:else}{/if}

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 1rem;
	}
</style>
