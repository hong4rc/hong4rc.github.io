<script lang="ts">
	import { config } from '$lib/config';
	import { browser, dev } from '$app/environment';
	import { onMount } from 'svelte';

	const gaId = config.analytics.googleAnalyticsId;
	const enabled = config.features.enableAnalytics && !!gaId && !dev;

	onMount(() => {
		if (!enabled || !browser) return;

		// Load GA script
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
		document.head.appendChild(script);

		// Initialize gtag
		window.dataLayer = window.dataLayer || [];
		function gtag(...args: unknown[]) {
			window.dataLayer.push(args);
		}
		gtag('js', new Date());
		gtag('config', gaId);
	});
</script>
