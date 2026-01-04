<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { getAbilities, getHeroes, getVersions } from '$lib/api/static.remote';
	import { getHeroBuilds } from '$lib/api/data.remote';
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
	{@const similarHeroes =
		heroes.success && hero
			? heroes.output.filter((h) => h.hero_type === hero.hero_type && h.id !== hero.id)
			: []}

	{@const builds = await getHeroBuilds({ heroId: hero?.id ?? 0 })}
	{console.log(builds)}

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

		{#if builds.success && builds.output.length > 0}
			<div class="builds">
				{#each builds.output.sort((a, b) => b.num_weekly_favorites - a.num_weekly_favorites) as build, index (index)}
					<div class="build">
						<h2>{build.hero_build.name}</h2>
						<p>{build.hero_build.description}</p>
						<span>Likes: {build.num_weekly_favorites}</span>
					</div>
				{/each}3
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

	.builds {
		display: grid;
		grid-auto-rows: min-content;
		gap: 2rem;
	}
	.build {
		display: grid;

		h2,
		p {
			margin: 0;
		}
	}

	.similar-heroes {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		gap: 0.5rem;
	}
</style>
