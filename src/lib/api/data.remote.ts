import * as v from 'valibot';

import { query } from '$app/server';

import {
	BuildsSchema,
	HeroesStatsSchema,
	PlayerMatchHistorySchema,
	SteamProfileSchema,
	SteamProfilesSearchSchema
} from '$lib/schemas/data';

export const steamProfilesSearch = query(v.object({ query: v.string() }), async ({ query }) => {
	const url = `https://api.deadlock-api.com/v1/players/steam-search?search_query=${query}`;
	const res = await fetch(url);
	const data = await res.json();

	const parsed = v.safeParse(SteamProfilesSearchSchema, data);

	return parsed;
});

export const steamProfile = query(v.object({ accountId: v.number() }), async ({ accountId }) => {
	const url = `https://api.deadlock-api.com/v1/players/steam?account_ids=${accountId}`;
	const res = await fetch(url);
	const data = await res.json();

	const parsed = v.safeParse(SteamProfileSchema, data);

	return parsed;
});

export const playerMatchHistory = query(
	v.object({ accountId: v.number() }),
	async ({ accountId }) => {
		const forceRefetch = false;
		const url = `https://api.deadlock-api.com/v1/players/${accountId}/match-history?force_refetch=${forceRefetch}`;
		const res = await fetch(url);
		const data = await res.json();

		const parsed = v.safeParse(PlayerMatchHistorySchema, data);

		return parsed;
	}
);

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
