<script lang="ts">
	import { config } from '$lib/config';
</script>

<svelte:head>
	<title>Blog | {config.name}</title>
</svelte:head>

<main class="blog-page">
	<nav class="top-nav">
		<a href="/" class="back-link">← {config.name}</a>
		<span class="nav-title">Blog</span>
	</nav>

	<section class="blog-content">
		<h1>Blog</h1>
		<p class="coming-soon">Coming soon...</p>
		<p class="description">I'll be writing about backend development, performance optimization, and my journey with Neovim and split keyboards.</p>
	</section>
</main>

<style>
	.blog-page {
		min-height: 100vh;
		background-color: var(--base);
		padding: 2rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.top-nav {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 4rem;
	}

	.back-link {
		color: var(--subtext);
		text-decoration: none;
		font-size: 1rem;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: var(--accent);
	}

	.nav-title {
		color: var(--surface2);
		font-size: 0.9rem;
	}

	.blog-content {
		text-align: center;
		padding: 4rem 0;
	}

	h1 {
		font-size: 2.5rem;
		color: var(--text);
		margin-bottom: 2rem;
	}

	.coming-soon {
		font-size: 1.5rem;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.description {
		color: var(--subtext);
		font-size: 1rem;
		line-height: 1.6;
		max-width: 500px;
		margin: 0 auto;
	}
</style>
