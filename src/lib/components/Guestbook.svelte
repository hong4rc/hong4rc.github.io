<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';
	import { reveal } from '$lib/actions/reveal';

	let giscusContainer: HTMLDivElement;

	function getGiscusTheme(t: string): string {
		const themeMap: Record<string, string> = {
			latte: 'light',
			frappe: 'dark_dimmed',
			macchiato: 'dark',
			mocha: 'dark_high_contrast'
		};
		return themeMap[t] || 'dark_dimmed';
	}

	function loadGiscus(currentTheme: string) {
		if (!browser || !giscusContainer) return;

		// Clear existing
		giscusContainer.innerHTML = '';

		const script = document.createElement('script');
		script.src = 'https://giscus.app/client.js';
		script.setAttribute('data-repo', 'hong4rc/hong4rc.github.io');
		script.setAttribute('data-repo-id', '');
		script.setAttribute('data-category', 'Guestbook');
		script.setAttribute('data-category-id', '');
		script.setAttribute('data-mapping', 'specific');
		script.setAttribute('data-term', 'guestbook');
		script.setAttribute('data-strict', '0');
		script.setAttribute('data-reactions-enabled', '1');
		script.setAttribute('data-emit-metadata', '0');
		script.setAttribute('data-input-position', 'top');
		script.setAttribute('data-theme', getGiscusTheme(currentTheme));
		script.setAttribute('data-lang', 'en');
		script.setAttribute('data-loading', 'lazy');
		script.setAttribute('crossorigin', 'anonymous');
		script.async = true;

		giscusContainer.appendChild(script);
	}

	onMount(() => {
		const unsubscribe = theme.subscribe((t) => {
			loadGiscus(t);
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<section class="guestbook" use:reveal>
	<h2>Guestbook</h2>
	<p class="subtitle">Leave a message, say hi, or share your thoughts!</p>
	<div class="giscus-wrapper" bind:this={giscusContainer}>
		<p class="setup-note">
			<a href="https://github.com/hong4rc/hong4rc.github.io/discussions" target="_blank" rel="noopener noreferrer">
				→ View discussions on GitHub
			</a>
		</p>
	</div>
</section>

<style>
	.guestbook {
		padding: 4rem 2rem;
		background-color: var(--mantle);
	}

	h2 {
		font-size: 1.5rem;
		color: var(--text);
		text-align: center;
		margin-bottom: 0.5rem;
	}

	.subtitle {
		text-align: center;
		color: var(--subtext);
		font-size: 0.9rem;
		margin-bottom: 2rem;
	}

	.giscus-wrapper {
		max-width: 700px;
		margin: 0 auto;
	}

	:global(.giscus) {
		max-width: 100%;
	}

	:global(.giscus-frame) {
		width: 100%;
	}

	.setup-note {
		text-align: center;
		color: var(--subtext);
		font-size: 0.85rem;
	}

	.setup-note a {
		color: var(--accent);
	}
</style>
