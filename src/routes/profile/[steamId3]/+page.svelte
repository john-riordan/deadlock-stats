<script lang="ts">
	import { page } from '$app/state';

	import { playerMatchHistory, steamProfile } from '$lib/api/data.remote';
</script>

<svelte:boundary>
	{@const profiles = await steamProfile({
		accountId: parseInt(page.params.steamId3 ?? '0')
	})}
	{#if profiles.success}
		{@const profile = profiles.output[0]}
		<h1>{profile.personaname}</h1>
		<img src={profile.avatarfull} alt={profile.personaname} width={100} height={100} />
	{:else}
		<h1>Error</h1>
		<p>Error fetching steam profile</p>
	{/if}
</svelte:boundary>

<svelte:boundary>
	{@const matchHistory = await playerMatchHistory({
		accountId: parseInt(page.params.steamId3 ?? '0')
	})}
	{#if matchHistory.success}
		<h1>Match History ({matchHistory.output.length})</h1>
		<pre>{JSON.stringify(matchHistory.output, null, 2)}</pre>
	{:else}
		<h1>Error</h1>
		<p>Error fetching match history</p>
	{/if}
</svelte:boundary>
