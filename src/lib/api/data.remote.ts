import * as v from 'valibot';

import { query } from '$app/server';

import { BuildsSchema, HeroesStatsSchema } from '$lib/schemas/data';

export const getHeroBuilds = query(v.object({ heroId: v.number() }), async ({ heroId }) => {
	const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
	const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
	const url = `https://api.deadlock-api.com/v1/builds?hero_id=${heroId}&limit=100&build_language=English`;
	const res = await fetch(url);
	const data = await res.json();

	const parsed = v.safeParse(BuildsSchema, data);

	return parsed;
});

export const getHeroesStats = query(async () => {
	// const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
	const url = `https://api.deadlock-api.com/v1/analytics/hero-stats`;
	const res = await fetch(url);
	const data = await res.json();

	const parsed = v.safeParse(HeroesStatsSchema, data);

	return parsed;
});
