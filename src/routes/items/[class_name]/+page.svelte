<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { getItems, getVersions } from '$lib/api/static.remote';
	import { validItem } from '$lib/utils/items';

	let versions = await getVersions();
	let items = await getItems({
		language: 'english',
		clientVersion: versions.success ? versions.output[0] : 6071
	});

	let item = $derived(
		items.success
			? items.output.find((item) => item.class_name === page.params.class_name)
			: undefined
	);

	let relatedItems = $derived.by(() => {
		if (!items.success || !item) return [];
		return items.success
			? items.output.filter(
					(i) =>
						i.item_tier === item.item_tier &&
						i.item_slot_type === item.item_slot_type &&
						validItem(i)
				)
			: [];
	});
</script>

<svelte:head>
	<title>{item?.name ?? 'Item'} - Deadlock Item</title>
</svelte:head>

{#if item}
	<img src={item.shop_image_small_webp} alt={item.name} width={100} height={100} />
	<h1>{item.name}</h1>
	<span>{item.cost} Souls</span>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<p>{@html item.description.desc}</p>
	{#if relatedItems.length > 0}
		<h2>Related Items</h2>
		<div class="related-items">
			{#each relatedItems.filter((item) => item.shop_image_small_webp) as relatedItem (relatedItem.id)}
				<a href={resolve(`/items/${relatedItem.class_name}`)} class="related-item">
					<img
						src={relatedItem.shop_image_small_webp}
						alt={relatedItem.name}
						width={40}
						height={40}
					/>
				</a>
			{/each}
		</div>
	{/if}

	<!-- <pre>{JSON.stringify(item, null, 2)}</pre> -->
{:else}
	<h1>Item not found</h1>
{/if}

<style>
	.related-items {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
		gap: 0.5rem;
	}
	.related-item {
		display: block;
	}
</style>
