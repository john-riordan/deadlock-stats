import * as v from 'valibot';

import { query } from '$app/server';

import { BuildsSchema } from '$lib/schemas/data';

export const getHeroBuilds = query(v.object({ heroId: v.number() }), async ({ heroId }) => {
	const url = `https://api.deadlock-api.com/v1/builds?hero_id=${heroId}&sort_by=weekly_favorites&limit=100&sort_direction=desc&build_language=English`;
	const res = await fetch(url);
	const data = await res.json();

	const parsed = v.safeParse(BuildsSchema, data);

	return parsed;
});
