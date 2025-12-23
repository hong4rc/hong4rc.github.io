<script lang="ts">
	import { config } from '$lib/config';
	import { page } from '$app/stores';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		type?: 'website' | 'article';
		publishedTime?: string;
		keywords?: string[];
	}

	let { title, description, image, type = 'website', publishedTime, keywords = [] }: Props = $props();

	const siteTitle = `${config.name} | ${config.title}`;
	const pageTitle = $derived(title ? `${title} | ${config.name}` : siteTitle);
	const pageDescription = $derived(description ?? config.seo.description);
	const pageImage = $derived(image ?? config.seo.ogImage);
	const canonicalUrl = $derived(`${config.seo.siteUrl}${$page.url.pathname}`);
	const allKeywords = $derived([...config.seo.keywords, ...keywords].join(', '));

	// JSON-LD structured data
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: config.name,
		url: config.seo.siteUrl,
		jobTitle: config.title,
		sameAs: [
			config.contact.github,
			config.contact.linkedin
		]
	};

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: config.name,
		url: config.seo.siteUrl,
		description: config.seo.description,
		author: {
			'@type': 'Person',
			name: config.name
		}
	};

	const profilePageSchema = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		mainEntity: {
			'@type': 'Person',
			name: config.name,
			jobTitle: config.title,
			url: config.seo.siteUrl,
			image: `${config.seo.siteUrl}${config.seo.ogImage}`,
			sameAs: [config.contact.github, config.contact.linkedin],
			knowsAbout: config.seo.keywords
		}
	};

	// BlogPosting schema for articles
	const blogPostSchema = $derived(type === 'article' ? {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		description: pageDescription,
		image: `${config.seo.siteUrl}${pageImage}`,
		url: canonicalUrl,
		datePublished: publishedTime,
		dateModified: publishedTime,
		author: {
			'@type': 'Person',
			name: config.name,
			url: config.seo.siteUrl
		},
		publisher: {
			'@type': 'Person',
			name: config.name,
			url: config.seo.siteUrl
		},
		keywords: keywords.join(', ')
	} : null);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="author" content={config.name} />
	<meta name="keywords" content={allKeywords} />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content="{config.seo.siteUrl}{pageImage}" />
	<meta property="og:site_name" content={config.name} />
	<meta property="og:locale" content="en_US" />
	{#if type === 'article' && publishedTime}
		<meta property="article:published_time" content={publishedTime} />
		<meta property="article:author" content={config.name} />
	{/if}

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content="{config.seo.siteUrl}{pageImage}" />
	<meta name="twitter:site" content={config.seo.twitterHandle} />
	<meta name="twitter:creator" content={config.seo.twitterHandle} />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
	{#if type === 'article' && blogPostSchema}
		{@html `<script type="application/ld+json">${JSON.stringify(blogPostSchema)}</script>`}
	{:else}
		{@html `<script type="application/ld+json">${JSON.stringify(profilePageSchema)}</script>`}
	{/if}

	<!-- RSS Feed -->
	{#if config.features.enableRss}
		<link rel="alternate" type="application/rss+xml" title="{config.name} RSS Feed" href="{config.seo.siteUrl}/rss.xml" />
	{/if}
</svelte:head>
