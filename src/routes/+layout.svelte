<script lang="ts">
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href={resolve('/')}>Home</a>
	<a href={resolve('/heroes')}>Heroes</a>
	<a href={resolve('/items')}>Items</a>
</nav>
{@render children()}

<style>
	nav {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background-color: var(--c10);
		border-bottom: 1px solid var(--c0);

		a {
			padding: 0.5rem 1rem;
		}
	}
</style>
