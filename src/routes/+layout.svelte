<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Analytics from '$lib/components/Analytics.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';

	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

<Analytics />
<CommandPalette />

<header>
	<nav>
		<a href="/" class="logo">H</a>
		<ThemeToggle />
	</nav>
</header>

{@render children()}

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		padding: 1rem 2rem;
		background: linear-gradient(to bottom, var(--base) 0%, transparent 100%);
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.logo {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--accent);
	}

	.logo:hover {
		color: var(--secondary);
	}
</style>
