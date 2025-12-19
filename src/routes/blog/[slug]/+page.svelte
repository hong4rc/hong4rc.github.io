<script lang="ts">
	import { config } from '$lib/config';
	import { getPostBySlug } from '$lib/blog/posts';
	import { page } from '$app/stores';

	let post = $derived(getPostBySlug($page.params.slug));

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
	}
</script>

<svelte:head>
	<title>{post?.title || 'Post'} | {config.name}</title>
</svelte:head>

<main class="post-page">
	{#if post}
		<article>
			<header class="post-header">
				<a href="/blog" class="back-link">← Back to blog</a>
				<h1>{post.title}</h1>
				<div class="post-meta">
					<span class="date">{formatDate(post.date)}</span>
					{#if post.readTime}
						<span class="separator">·</span>
						<span class="read-time">{post.readTime} read</span>
					{/if}
				</div>
				<div class="post-tags">
					{#each post.tags as tag}
						<a href="/blog?tag={tag}" class="tag">#{tag}</a>
					{/each}
				</div>
			</header>

			<div class="post-content">
				<p class="coming-soon">Content coming soon...</p>
				<p class="placeholder">{post.description}</p>
			</div>
		</article>
	{:else}
		<div class="not-found">
			<h1>Post not found</h1>
			<a href="/blog" class="back-link">← Back to blog</a>
		</div>
	{/if}
</main>

<style>
	.post-page {
		min-height: 100vh;
		background-color: var(--base);
		padding: 2rem;
		padding-top: 6rem;
		max-width: 700px;
		margin: 0 auto;
	}

	.back-link {
		display: inline-block;
		color: var(--subtext);
		text-decoration: none;
		font-size: 0.9rem;
		margin-bottom: 2rem;
		transition: color 0.2s;
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

	.post-content {
		color: var(--text);
		line-height: 1.8;
	}

	.coming-soon {
		font-size: 1.2rem;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.placeholder {
		color: var(--subtext);
		font-style: italic;
	}

	.not-found {
		text-align: center;
		padding: 4rem 0;
	}

	.not-found h1 {
		margin-bottom: 1rem;
	}
</style>
