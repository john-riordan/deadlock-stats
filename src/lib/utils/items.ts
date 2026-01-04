import type { Item } from '$lib/schemas/static';

export function validItem(item: Item) {
	return !item.disabled && item.shop_image_small_webp;
}

export function itemGroups(items: Item[]) {
	return (items || []).reduce(
		(acc, item) => {
			if (!validItem(item)) return acc;
			acc[item.item_slot_type].push(item);
			return acc;
		},
		{ vitality: [], spirit: [], weapon: [] } as Record<string, Item[]>
	);
}
