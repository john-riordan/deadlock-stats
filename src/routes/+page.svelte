<script lang="ts">
	import { getVersions } from '$lib/api/static.remote';
	import HeroesList from '$lib/components/HeroesList.svelte';
</script>

<svelte:boundary>
	{@const versions = await getVersions()}
	{@const version = versions.success ? versions.output[0] : 6071}
	<HeroesList {version} />
</svelte:boundary>
