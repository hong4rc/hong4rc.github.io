<script lang="ts">
	import { config } from '$lib/config';
	import { browser, dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { analytics, GoogleAnalyticsPlugin } from '$lib/analytics';

	onMount(() => {
		if (!browser || dev || !config.features.enableAnalytics) return;

		// Register Google Analytics plugin
		if (config.analytics.googleAnalyticsId) {
			const gaPlugin = new GoogleAnalyticsPlugin(config.analytics.googleAnalyticsId);
			analytics.register(gaPlugin);
		}

		// Initialize all analytics plugins
		analytics.init();
	});
</script>
