<script lang="ts">
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Analytics from '$lib/components/Analytics.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';

	let { children } = $props();
	let scrolled = $state(false);

	function handleScroll() {
		scrolled = window.scrollY > 200;
	}

	onMount(() => {
		theme.init();
		if (browser) {
			window.addEventListener('scroll', handleScroll);
			handleScroll();
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<Analytics />
<CommandPalette />

<header class:scrolled>
	<nav>
		<a href="/" class="logo">
			{#if scrolled}
				Hong<span class="highlight">4</span>rc
			{:else}
				H
			{/if}
		</a>
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
		transition: background-color 0.3s, border-color 0.3s;
	}

	header.scrolled {
		background: var(--base);
		border-bottom: 1px solid var(--surface0);
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
		color: var(--text);
	}

	.logo:hover {
		color: var(--subtext);
	}

	.logo .highlight {
		color: var(--accent);
	}
</style>
