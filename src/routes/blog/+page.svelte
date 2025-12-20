<script lang="ts">
	import { config } from '$lib/config';
	import { posts, getAllTags } from '$lib/blog/posts';

	const allTags = getAllTags();
	let selectedTag = $state<string | null>(null);

	let filteredPosts = $derived(
		selectedTag ? posts.filter(p => p.tags.includes(selectedTag!)) : posts
	);

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}

	function selectTag(tag: string) {
		selectedTag = selectedTag === tag ? null : tag;
	}
</script>

<svelte:head>
	<title>Blog | {config.name}</title>
	<meta name="description" content="Backend dev thoughts, keyboard obsessions, and occasional wisdom from {config.name}. Articles about Node.js, TypeScript, Neovim, and developer productivity." />
</svelte:head>

<main class="blog-page">
	<header class="blog-header">
		<div class="avatar">
			<span class="avatar-text">H4</span>
		</div>
		<div class="header-info">
			<h1>{config.name}'s Blog</h1>
			<p class="tagline">Backend dev thoughts, keyboard obsessions, and occasional wisdom</p>
		</div>
	</header>

	<nav class="tags-nav">
		<button
			class="tag-btn"
			class:active={selectedTag === null}
			onclick={() => selectedTag = null}
		>
			All
		</button>
		{#each allTags as tag}
			<button
				class="tag-btn"
				class:active={selectedTag === tag}
				onclick={() => selectTag(tag)}
			>
				#{tag}
			</button>
		{/each}
	</nav>

	<section class="timeline">
		{#each filteredPosts as post}
			<a href="/blog/{post.slug}" class="timeline-item">
				<div class="timeline-date">
					<span class="date">{formatDate(post.date)}</span>
					{#if post.readTime}
						<span class="read-time">{post.readTime}</span>
					{/if}
				</div>
				<div class="timeline-content">
					<h2>{post.title}</h2>
					<p class="description">{post.description}</p>
					<div class="post-tags">
						{#each post.tags as tag}
							<span class="post-tag">#{tag}</span>
						{/each}
					</div>
				</div>
			</a>
		{/each}

		{#if filteredPosts.length === 0}
			<p class="no-posts">No posts found with tag #{selectedTag}</p>
		{/if}
	</section>
</main>

<style>
	.blog-page {
		min-height: 100vh;
		background-color: var(--base);
		padding: 2rem;
		padding-top: 6rem;
		max-width: 700px;
		margin: 0 auto;
	}

	.blog-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--surface0);
	}

	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--accent), var(--secondary));
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.avatar-text {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--crust);
	}

	.header-info h1 {
		font-size: 1.5rem;
		color: var(--text);
		margin-bottom: 0.25rem;
	}

	.tagline {
		color: var(--subtext);
		font-size: 0.9rem;
	}

	.tags-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.tag-btn {
		padding: 0.4rem 0.8rem;
		border: none;
		border-radius: 20px;
		background-color: var(--surface0);
		color: var(--subtext);
		font-size: 0.8rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.2s;
	}

	.tag-btn:hover {
		background-color: var(--surface1);
		color: var(--text);
	}

	.tag-btn.active {
		background-color: var(--accent);
		color: var(--crust);
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.timeline-item {
		display: flex;
		gap: 1.5rem;
		padding: 1.25rem;
		background-color: var(--surface0);
		border-radius: 8px;
		text-decoration: none;
		transition: all 0.2s;
	}

	.timeline-item:hover {
		background-color: var(--surface1);
		transform: translateX(4px);
	}

	.timeline-date {
		flex-shrink: 0;
		width: 90px;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.date {
		font-size: 0.8rem;
		color: var(--subtext);
	}

	.read-time {
		font-size: 0.7rem;
		color: var(--surface2);
	}

	.timeline-content {
		flex: 1;
		min-width: 0;
	}

	.timeline-content h2 {
		font-size: 1.1rem;
		color: var(--text);
		margin-bottom: 0.5rem;
	}

	.timeline-item:hover h2 {
		color: var(--accent);
	}

	.description {
		font-size: 0.85rem;
		color: var(--subtext);
		line-height: 1.5;
		margin-bottom: 0.75rem;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.post-tag {
		font-size: 0.7rem;
		color: var(--accent);
		opacity: 0.8;
	}

	.no-posts {
		text-align: center;
		color: var(--subtext);
		padding: 2rem;
	}

	@media (max-width: 600px) {
		.timeline-item {
			flex-direction: column;
			gap: 0.75rem;
		}

		.timeline-date {
			width: auto;
			flex-direction: row;
			gap: 1rem;
		}
	}
</style>
