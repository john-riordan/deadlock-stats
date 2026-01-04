<script lang="ts">
	import { resolve } from '$app/paths';

	import { getItems, getVersions } from '$lib/api/static.remote';
	import type { Item } from '$lib/schemas/static';
	import { itemGroups } from '$lib/utils/items';

	let search = $state('');
</script>

<svelte:boundary>
	{@const versions = await getVersions()}
	{@const version = versions.success ? versions.output[0] : 6071}
	{@const items = await getItems({
		language: 'english',
		clientVersion: version
	})}
	{@const { vitality, spirit, weapon } = itemGroups(items.success ? items.output : [])}

	<input type="text" bind:value={search} placeholder="Search" />

	{@render Group('Vitality', vitality)}
	{@render Group('Spirit', spirit)}
	{@render Group('Weapon', weapon)}

	{#snippet failed(error)}
		<h1>Error: {error}</h1>
	{/snippet}
</svelte:boundary>

{#snippet Group(name: string, items: Item[])}
	<div>
		<h2>{name}</h2>
		<div class="items">
			{#each items
				.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
				.sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name)) as item (item.id)}
				<a href={resolve(`/items/${item.class_name}`)} class="item">
					<img src={item.shop_image_small_webp} alt={item.name} width={100} height={100} />
					<span>{item.name}</span>
					<span>{item.cost}</span>
				</a>
			{/each}
		</div>
	</div>
{/snippet}

<style>
	.items {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 1rem;
	}
	.item {
		display: grid;
		grid-auto-rows: min-content;
		gap: 0.25rem;
		text-align: center;
	}
</style>
