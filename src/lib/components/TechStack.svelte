<script lang="ts">
	import { config } from '$lib/config';
</script>

<section class="tech-stack">
	<h2>Tech Stack</h2>
	<div class="stack-list">
		{#each config.techStack as tech}
			<span class="tech-item">{tech}</span>
		{/each}
	</div>
</section>

<style>
	.tech-stack {
		padding: 4rem 2rem;
		text-align: center;
		background-color: var(--mantle);
	}

	h2 {
		font-size: 1.5rem;
		color: var(--text);
		margin-bottom: 2rem;
	}

	.stack-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.tech-item {
		padding: 0.5rem 1rem;
		background-color: var(--surface0);
		color: var(--subtext);
		border-radius: 4px;
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.tech-item:hover {
		background-color: var(--surface1);
		color: var(--accent);
	}
</style>
