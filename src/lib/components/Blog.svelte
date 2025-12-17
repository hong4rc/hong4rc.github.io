<script lang="ts">
	import { config } from '$lib/config';

	const posts: { title: string; date: string; excerpt: string; link?: string }[] = [];
</script>

{#if config.features.showBlog}
	<section class="blog">
		<h2>Blog</h2>
		{#if posts.length > 0}
			<div class="post-list">
				{#each posts as post}
					<article class="post-item">
						<time>{post.date}</time>
						<h3>{post.title}</h3>
						<p>{post.excerpt}</p>
						{#if post.link}
							<a href={post.link}>Read more</a>
						{/if}
					</article>
				{/each}
			</div>
		{:else}
			<p class="placeholder">Coming soon...</p>
		{/if}
	</section>
{/if}

<style>
	.blog {
		padding: 4rem 2rem;
		text-align: center;
	}

	h2 {
		font-size: 1.5rem;
		color: var(--text);
		margin-bottom: 2rem;
	}

	.post-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 700px;
		margin: 0 auto;
	}

	.post-item {
		padding: 1.5rem;
		background-color: var(--surface0);
		border-radius: 8px;
		text-align: left;
	}

	.post-item time {
		font-size: 0.8rem;
		color: var(--surface2);
	}

	.post-item h3 {
		color: var(--text);
		margin: 0.5rem 0;
	}

	.post-item p {
		color: var(--subtext);
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}

	.placeholder {
		color: var(--surface2);
	}
</style>
