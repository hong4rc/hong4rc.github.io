<script lang="ts">
	import { config } from '$lib/config';
	import { browser, dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { analytics } from '$lib/analytics';

	// Only load analytics in production
	const shouldLoad = !dev && config.features.enableAnalytics && config.analytics.googleAnalyticsId;

	onMount(() => {
		if (!browser || !shouldLoad) return;

		// Initialize gtag (script is already loaded via svelte:head)
		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag(...args: unknown[]) {
			window.dataLayer.push(args);
		};
		window.gtag('js', new Date());
		window.gtag('config', config.analytics.googleAnalyticsId);

		console.log('[Analytics] Google Analytics initialized:', config.analytics.googleAnalyticsId);
	});
</script>

<svelte:head>
	{#if shouldLoad}
		<!-- Google Analytics -->
		<script
			async
			src="https://www.googletagmanager.com/gtag/js?id={config.analytics.googleAnalyticsId}"
		></script>
	{/if}
</svelte:head>
