<script lang="ts">
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { theme } from '$lib/stores/theme';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Analytics from '$lib/components/Analytics.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import SectionNav from '$lib/components/SectionNav.svelte';

	let { children } = $props();

	let isHomePage = $derived($page.url.pathname === '/');
	let scrolled = $state(false);

	function handleScroll() {
		scrolled = window.scrollY > 200;
	}

	onMount(() => {
		theme.init();
		if (browser) {
			// Show page after ready (prevents flash)
			document.body.classList.add('ready');

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
{#if isHomePage}
	<CommandPalette />
	<SectionNav />
{/if}

<header class:scrolled>
	<nav>
		<div class="nav-left">
			<a href="/" class="logo">
				<span class="logo-letter">H</span><span class="logo-expand">ong<span class="highlight">4</span>rc</span>
			</a>
			<a href="/blog" class="nav-link">Blog</a>
		</div>
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

	.nav-left {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.nav-link {
		font-size: 0.9rem;
		color: var(--subtext);
		text-decoration: none;
		transition: color 0.2s;
	}

	.nav-link:hover {
		color: var(--accent);
	}

	.logo {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text);
		display: flex;
		align-items: center;
	}

	.logo:hover {
		color: var(--subtext);
	}

	.logo .highlight {
		color: var(--accent);
	}

	.logo-letter {
		display: inline-block;
	}

	.logo-expand {
		display: inline-block;
		max-width: 0;
		overflow: hidden;
		opacity: 0;
		transition: max-width 0.4s ease, opacity 0.3s ease;
	}

	.scrolled .logo-expand {
		max-width: 6rem;
		opacity: 1;
	}

	@media (max-width: 480px) {
		header {
			padding: 0.75rem 1rem;
		}

		.nav-left {
			gap: 1rem;
		}

		.logo {
			font-size: 1.25rem;
		}

		.nav-link {
			font-size: 0.8rem;
		}
	}
</style>
