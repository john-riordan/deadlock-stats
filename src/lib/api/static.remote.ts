import * as v from 'valibot';

import { prerender, query } from '$app/server';

import { HeroesSchema, HeroSchema, VersionsSchema } from '$lib/schemas/static';

export const getVersions = query(async () => {
	const url = 'https://assets.deadlock-api.com/v2/client-versions';
	const res = await fetch(url);
	const data = await res.json();

	const parsed = v.safeParse(VersionsSchema, data);

	return parsed;
});

export const getHeroes = prerender(
	v.object({ language: v.string(), clientVersion: v.number() }),
	async ({ language = 'english', clientVersion = 6071 }) => {
		const url = `https://assets.deadlock-api.com/v2/heroes?language=${language}&client_version=${clientVersion}&only_active=true`;
		const res = await fetch(url);
		const data = await res.json();

		const parsed = v.safeParse(HeroesSchema, data);

		return parsed;
	}
);

export const getHero = prerender(
	v.object({ id: v.number(), language: v.string(), clientVersion: v.number() }),
	async ({ id, language = 'english', clientVersion = 6071 }) => {
		const url = `https://assets.deadlock-api.com/v2/heroes/${id}?language=${language}&client_version=${clientVersion}&only_active=true`;
		const res = await fetch(url);
		const data = await res.json();

		const parsed = v.safeParse(HeroSchema, data);

		return parsed;
	}
);
