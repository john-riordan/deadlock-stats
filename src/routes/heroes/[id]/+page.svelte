<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { getAbilities, getHeroes, getVersions } from '$lib/api/static.remote';
	import { getHeroBuilds, getHeroesStats } from '$lib/api/data.remote';
	import { getItems } from '$lib/api/static.remote';
	import type { Item } from '$lib/schemas/static';
</script>

<svelte:boundary>
	{@const versions = await getVersions()}
	{@const heroes = await getHeroes({
		language: 'english',
		clientVersion: versions.success ? versions.output[0] : 6071
	})}
	{@const hero = heroes.success
		? heroes.output.find((hero) => hero.id === parseInt(page.params.id || '0'))
		: undefined}
	{@const abilities = await getAbilities({
		language: 'english',
		clientVersion: versions.success ? versions.output[0] : 6071
	})}
	{@const heroAbilities =
		abilities.success && hero ? abilities.output.filter((ability) => ability.hero === hero.id) : []}
	{@const heroSpells = heroAbilities.filter(
		(ability) => ability.ability_type === 'signature' || ability.ability_type === 'ultimate'
	)}
	{@const heroesStats = await getHeroesStats()}
	{@const heroStats = heroesStats.success
		? heroesStats.output.find((stat) => stat.hero_id === hero?.id)
		: undefined}

	{@const similarHeroes =
		heroes.success && hero
			? heroes.output.filter((h) => h.hero_type === hero.hero_type && h.id !== hero.id)
			: []}

	{@const builds = await getHeroBuilds({ heroId: hero?.id ?? 0 })}
	{@const items = await getItems({
		language: 'english',
		clientVersion: versions.success ? versions.output[0] : 6071
	})}
	{@const itemsMap = items.success
		? items.output.reduce(
				(acc, item) => {
					acc[item.id] = item;
					return acc;
				},
				{} as Record<number, Item>
			)
		: {}}

	{#if hero}
		<header>
			<img src={hero.images.icon_image_small_webp} alt={hero.name} width={100} height={100} />
			<div>
				<h1>{hero.name}</h1>
				<!-- <p>{hero.description.lore}</p> -->
			</div>
		</header>
		{#if heroSpells.length > 0}
			<div class="spells">
				{#each heroSpells as spell (spell.id)}
					<img src={spell.image_webp} alt={spell.name} width={100} height={100} />
				{/each}
			</div>
		{/if}

		{#if heroStats}
			<div class="stats">
				<p class="stat">
					<span>Win Rate</span>
					<span>
						{(heroStats.wins / heroStats.matches).toLocaleString('en-US', {
							style: 'percent',
							minimumFractionDigits: 1,
							maximumFractionDigits: 1
						})}
					</span>
				</p>
				<p class="stat">
					<span>Matches</span>
					<span>{heroStats.matches.toLocaleString('en-US')}</span>
				</p>
				<p class="stat">
					<span>KDA</span>
					<span>
						{(
							(heroStats.total_kills + heroStats.total_assists) /
							heroStats.total_deaths
						).toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}
					</span>
				</p>
				<p class="stat">
					<span>Denies</span>
					<span>
						{(heroStats.total_denies / heroStats.matches).toLocaleString('en-US', {
							minimumFractionDigits: 1,
							maximumFractionDigits: 1
						})}
					</span>
				</p>
				<p class="stat">
					<span>Player Damage</span>
					<span
						>{(heroStats.total_player_damage / heroStats.matches).toLocaleString('en-US', {
							minimumFractionDigits: 0,
							maximumFractionDigits: 0
						})}
					</span>
				</p>
				<p class="stat">
					<span>Souls</span>
					<span>
						{(heroStats.total_net_worth / heroStats.matches).toLocaleString('en-US', {
							minimumFractionDigits: 0,
							maximumFractionDigits: 0
						})}
					</span>
				</p>
			</div>
		{/if}

		{#if builds.success && builds.output.length > 0}
			<div class="builds">
				{#each builds.output.sort((a, b) => b.num_weekly_favorites - a.num_weekly_favorites) as build, index (index)}
					<div class="build">
						<h2>{build.hero_build.name}</h2>
						<span>
							Last updated: {new Date(
								build.hero_build.last_updated_timestamp * 1000
							).toLocaleDateString()}
						</span>
						<p>{build.hero_build.description}</p>
						<span>Likes: {build.num_weekly_favorites}</span>
						<div class="groups">
							{#each build.hero_build.details.mod_categories as group, i (i)}
								<div class="group">
									<h3>{group.name}</h3>
									<div class="mods">
										{#each group.mods as mod (mod.ability_id)}
											{@const item = itemsMap[mod.ability_id]}
											<div class="mod">
												{#if item}
													<img
														src={item.shop_image_small_webp}
														alt={item.name}
														width={60}
														height={60}
													/>
												{/if}
												<span>{item?.name ?? mod.ability_id}</span>
												<span>{mod.annotation}</span>
												<!-- <span>{mod.imbue_target_ability_id}</span> -->
											</div>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}

		{#if similarHeroes.length > 0}
			<h2>Similar Heroes</h2>
			<div class="similar-heroes">
				{#each similarHeroes as similarHero (similarHero.id)}
					<a href={resolve(`/heroes/${similarHero.id}`)}>
						<img
							src={similarHero.images.icon_image_small_webp}
							alt={similarHero.name}
							width={62}
							height={62}
						/>
						<span>{similarHero.name}</span>
					</a>
				{/each}
			</div>
		{/if}

		<!-- <pre>{JSON.stringify(hero.output, null, 2)}</pre> -->
	{:else}
		<h1>Hero not found</h1>
	{/if}

	{#snippet failed(error)}
		<h1>Error: {error}</h1>
	{/snippet}
</svelte:boundary>

<style>
	header {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.spells {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 0.5rem;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 0.5rem;
	}
	.stat {
		display: grid;
		text-align: center;
	}

	.builds {
		display: grid;
		grid-auto-rows: min-content;
		gap: 2rem;
	}
	.build {
		display: grid;
		padding: 1rem;
		border: 1px solid var(--c0);

		h2,
		p {
			margin: 0;
		}
	}

	.mods {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 0.5rem;
	}
	.mod {
		/* border: 1px solid var(--c0); */
	}

	.similar-heroes {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 0.5rem;
	}
</style>
