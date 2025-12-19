<script lang="ts">
	import { config } from '$lib/config';
</script>

<svelte:head>
	<title>Blog | {config.name}</title>
</svelte:head>

<main class="blog-page">
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
		padding-top: 6rem;
		max-width: 800px;
		margin: 0 auto;
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
