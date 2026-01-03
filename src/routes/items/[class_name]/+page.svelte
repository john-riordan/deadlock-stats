<script lang="ts">
	import { page } from '$app/state';

	import { getItems, getVersions } from '$lib/api/static.remote';

	let versions = await getVersions();
	let items = await getItems({
		language: 'english',
		clientVersion: versions.success ? versions.output[0] : 6071
	});

	let item = $derived(
		items.success ? items.output.find((item) => item.class_name === page.params.class_name) : null
	);
</script>

<svelte:head>
	<title>{item?.name} - Deadlock Item</title>
</svelte:head>

{#if item}
	<img src={item.shop_image_small_webp} alt={item.name} width={100} height={100} />
	<h1>{item.name}</h1>
	<span>{item.cost} Souls</span>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<p>{@html item.description.desc}</p>
	<pre>{JSON.stringify(item, null, 2)}</pre>
{:else}
	<h1>Item not found</h1>
{/if}
