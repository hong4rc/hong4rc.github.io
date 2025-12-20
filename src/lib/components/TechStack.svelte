<script lang="ts">
	import { config } from '$lib/config';
	import { reveal } from '$lib/actions/reveal';
	import TechIcon from './TechIcon.svelte';
</script>

<section class="tech-stack" use:reveal>
	<h2>Tech Stack</h2>
	<div class="stack-list">
		{#each config.techStack as tech}
			<span class="tech-item">
				<TechIcon icon={tech.icon} colored />
				{tech.name}
			</span>
		{/each}
	</div>
</section>

<style>
	.tech-stack {
		padding: 4rem 2rem;
		text-align: center;
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
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: var(--surface0);
		color: var(--text);
		border-radius: 4px;
		font-size: 0.9rem;
		transition: all 0.2s ease;
		cursor: default;
		user-select: none;
	}

	.tech-item:hover {
		background-color: var(--surface1);
		transform: translateY(-2px);
	}
</style>
