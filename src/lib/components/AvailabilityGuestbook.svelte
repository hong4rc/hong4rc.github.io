<script lang="ts">
	import { config } from '$lib/config';
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
		if (config.features.showGuestbook) {
			const unsubscribe = theme.subscribe((t) => {
				loadGiscus(t);
			});
			return () => unsubscribe();
		}
	});
</script>

<section class="split-section" use:reveal>
	<div class="split-container">
		{#if config.features.showAvailability && config.availability}
			<div class="availability-side">
				<h2>Status</h2>
				<div class="banner" class:available={config.availability.available}>
					<span class="status-dot"></span>
					<span class="status-text">{config.availability.status}</span>
				</div>
				{#if config.availability.message}
					<p class="message">{config.availability.message}</p>
				{/if}
			</div>
		{/if}

		<div class="divider"></div>

		{#if config.features.showGuestbook}
			<div class="guestbook-side">
				<h2>Guestbook</h2>
				<p class="subtitle">Leave a message or say hi!</p>
				<div class="giscus-wrapper" bind:this={giscusContainer}>
					<p class="setup-note">
						<a href="https://github.com/hong4rc/hong4rc.github.io/discussions" target="_blank" rel="noopener noreferrer">
							→ View discussions on GitHub
						</a>
					</p>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.split-section {
		padding: 4rem 2rem;
		background-color: var(--mantle);
	}

	.split-container {
		display: flex;
		gap: 2rem;
		max-width: 1000px;
		margin: 0 auto;
		align-items: flex-start;
	}

	.availability-side {
		flex: 0 0 280px;
		text-align: center;
	}

	.divider {
		width: 1px;
		background-color: var(--surface0);
		align-self: stretch;
	}

	.guestbook-side {
		flex: 1;
		min-width: 0;
	}

	h2 {
		font-size: 1.2rem;
		color: var(--text);
		margin-bottom: 1rem;
	}

	.availability-side h2 {
		text-align: center;
	}

	.banner {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: var(--surface0);
		border-radius: 20px;
		margin-bottom: 0.5rem;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--subtext);
		animation: pulse 2s ease-in-out infinite;
	}

	.banner.available .status-dot {
		background-color: #22c55e;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	.status-text {
		font-size: 0.9rem;
		color: var(--text);
	}

	.message {
		font-size: 0.85rem;
		color: var(--subtext);
	}

	.subtitle {
		color: var(--subtext);
		font-size: 0.85rem;
		margin-bottom: 1rem;
	}

	.giscus-wrapper {
		max-width: 100%;
	}

	:global(.giscus) {
		max-width: 100%;
	}

	:global(.giscus-frame) {
		width: 100%;
	}

	.setup-note {
		color: var(--subtext);
		font-size: 0.85rem;
	}

	.setup-note a {
		color: var(--accent);
	}

	@media (max-width: 768px) {
		.split-container {
			flex-direction: column;
			align-items: center;
		}

		.availability-side {
			flex: none;
			width: 100%;
		}

		.divider {
			width: 100%;
			height: 1px;
		}

		.guestbook-side {
			width: 100%;
		}
	}
</style>
