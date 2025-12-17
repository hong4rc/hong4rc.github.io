<script lang="ts">
	import { config } from '$lib/config';
	import { page } from '$app/stores';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
	}

	let { title, description, image }: Props = $props();

	const siteTitle = `${config.name} | ${config.title}`;
	const pageTitle = $derived(title ? `${title} | ${config.name}` : siteTitle);
	const pageDescription = $derived(description ?? config.bio);
	const pageImage = $derived(image ?? config.seo.ogImage);
	const canonicalUrl = $derived(`${config.seo.siteUrl}${$page.url.pathname}`);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content="{config.seo.siteUrl}{pageImage}" />
	<meta property="og:site_name" content={config.name} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content="{config.seo.siteUrl}{pageImage}" />
	<meta name="twitter:site" content={config.seo.twitterHandle} />

	<!-- RSS Feed -->
	{#if config.features.enableRss}
		<link rel="alternate" type="application/rss+xml" title="{config.name} RSS Feed" href="{config.seo.siteUrl}/rss.xml" />
	{/if}
</svelte:head>
