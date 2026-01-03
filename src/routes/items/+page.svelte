<script lang="ts">
	import { resolve } from '$app/paths';

	import { getItems, getVersions } from '$lib/api/static.remote';
	import type { Item } from '$lib/schemas/static';

	let search = $state('');

	let versions = await getVersions();

	let items = await getItems({
		language: 'english',
		clientVersion: versions.success ? versions.output[0] : 6071
	});

	let { vitality, spirit, weapon } = $derived.by(() => {
		if (!items.success) return { vitality: [], spirit: [], weapon: [] };
		return items.output.reduce(
			(acc, item) => {
				if (item.disabled || !item.shop_image_small_webp) return acc;
				acc[item.item_slot_type].push(item);
				return acc;
			},
			{ vitality: [], spirit: [], weapon: [] } as Record<string, Item[]>
		);
	});
</script>

{#if items.success}
	<input type="text" bind:value={search} placeholder="Search" />

	<h1>Vitality</h1>
	<div class="items">
		{#each vitality
			.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
			.sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name)) as item (item.id)}
			<a href={resolve(`/items/${item.class_name}`)} class="item">
				<img src={item.shop_image_small_webp} alt={item.name} width={100} height={100} />
				<span>{item.name}</span>
				<span>{item.cost}</span>
			</a>
		{/each}
	</div>
	<h1>Spirit</h1>
	<div class="items">
		{#each spirit
			.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
			.sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name)) as item (item.id)}
			<a href={resolve(`/items/${item.class_name}`)} class="item">
				<img src={item.shop_image_small_webp} alt={item.name} width={100} height={100} />
				<span>{item.name}</span>
				<span>{item.cost}</span>
			</a>
		{/each}
	</div>
	<h1>Weapon</h1>
	<div class="items">
		{#each weapon
			.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
			.sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name)) as item (item.id)}
			<a href={resolve(`/items/${item.class_name}`)} class="item">
				<img src={item.shop_image_small_webp} alt={item.name} width={100} height={100} />
				<span>{item.name}</span>
				<span>{item.cost}</span>
			</a>
		{/each}
	</div>
{:else}
	<h1>Items not found</h1>
{/if}

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
