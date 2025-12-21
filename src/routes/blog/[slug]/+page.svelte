<script lang="ts">
	import { config } from '$lib/config';
	import { fade } from 'svelte/transition';
	import PostNav from '$lib/components/PostNav.svelte';

	let { data } = $props();
	let showBackLink = $state(false);

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function handleScroll() {
		showBackLink = window.scrollY > 300;
	}
</script>

<svelte:window onscroll={handleScroll} />

<svelte:head>
	<title>{data.post?.title || 'Post'} | {config.name}</title>
	{#if data.post?.description}
		<meta name="description" content={data.post.description} />
	{/if}
</svelte:head>

{#if showBackLink}
	<a href="/blog" class="back-link" transition:fade={{ duration: 200 }}>← Back to blog</a>
{/if}

<main id="main" class="post-page">
	{#if data.post && data.Content}
		<article>
			<header class="post-header">
				<h1>{data.post.title}</h1>
				<div class="post-meta">
					<span class="date">{formatDate(data.post.date)}</span>
					{#if data.post.readTime}
						<span class="separator">·</span>
						<span class="read-time">{data.post.readTime} read</span>
					{/if}
				</div>
				<div class="post-tags">
					{#each data.post.tags as tag}
						<a href="/blog?tag={tag}" class="tag">#{tag}</a>
					{/each}
				</div>
			</header>

			<div class="post-content prose">
				<data.Content />
			</div>
		</article>
	{:else}
		<div class="not-found">
			<h1>Post not found</h1>
		</div>
	{/if}
</main>

<PostNav prevPost={data.prevPost} nextPost={data.nextPost} />

<style>
	.post-page {
		min-height: 100vh;
		background-color: var(--base);
		padding: 2rem;
		padding-top: 6rem;
		max-width: var(--blog-width);
		margin: 0 auto;
	}

	.back-link {
		position: fixed;
		top: 5rem;
		left: calc(50% - var(--blog-width) / 2 - 8rem);
		color: var(--subtext);
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.2s;
		z-index: 10;
	}

	@media (max-width: 1000px) {
		.back-link {
			position: static;
			display: block;
			padding: 6rem 2rem 0;
			max-width: var(--blog-width);
			margin: 0 auto;
		}
	}

	.back-link:hover {
		color: var(--accent);
	}

	.post-header {
		margin-bottom: 3rem;
	}

	h1 {
		font-size: 2rem;
		color: var(--text);
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--subtext);
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}

	.separator {
		color: var(--surface2);
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		font-size: 0.8rem;
		color: var(--accent);
		text-decoration: none;
		padding: 0.2rem 0.6rem;
		background-color: var(--surface0);
		border-radius: 12px;
		transition: background-color 0.2s;
	}

	.tag:hover {
		background-color: var(--surface1);
	}

	/* Prose styles for markdown content */
	.prose {
		color: var(--text);
		line-height: 1.8;
	}

	.prose :global(h1) {
		font-size: 1.8rem;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		color: var(--text);
	}

	.prose :global(h2) {
		font-size: 1.4rem;
		margin-top: 2rem;
		margin-bottom: 0.75rem;
		color: var(--text);
	}

	.prose :global(h3) {
		font-size: 1.2rem;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
		color: var(--text);
	}

	.prose :global(p) {
		margin-bottom: 1.25rem;
	}

	.prose :global(ul),
	.prose :global(ol) {
		margin-bottom: 1.25rem;
		padding-left: 1.5rem;
	}

	.prose :global(li) {
		margin-bottom: 0.5rem;
	}

	.prose :global(a) {
		color: var(--accent);
		text-decoration: underline;
	}

	.prose :global(a:hover) {
		color: var(--secondary);
	}

	.prose :global(code) {
		background-color: var(--surface0);
		padding: 0.15rem 0.4rem;
		border-radius: 4px;
		font-size: 0.9em;
	}

	.prose :global(pre) {
		background-color: var(--mantle);
		padding: 1rem;
		border-radius: 8px;
		overflow-x: auto;
		margin-bottom: 1.25rem;
	}

	.prose :global(pre code) {
		background: none;
		padding: 0;
	}

	.prose :global(blockquote) {
		border-left: 3px solid var(--accent);
		padding-left: 1rem;
		margin-left: 0;
		color: var(--subtext);
		font-style: italic;
	}

	.prose :global(strong) {
		color: var(--text);
		font-weight: 600;
	}

	.prose :global(em) {
		color: var(--subtext);
	}

	.prose :global(hr) {
		border: none;
		border-top: 1px solid var(--surface0);
		margin: 2rem 0;
	}

	.not-found {
		text-align: center;
		padding: 4rem 0;
	}

	.not-found h1 {
		margin-bottom: 1rem;
	}
</style>
