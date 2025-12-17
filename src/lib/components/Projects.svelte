<script lang="ts">
	import { config } from '$lib/config';

	const projects: { title: string; description: string; link?: string }[] = [];
</script>

{#if config.features.showProjects}
	<section class="projects">
		<h2>Projects</h2>
		{#if projects.length > 0}
			<div class="project-list">
				{#each projects as project}
					<div class="project-item">
						<h3>{project.title}</h3>
						<p>{project.description}</p>
						{#if project.link}
							<a href={project.link} target="_blank" rel="noopener">View Project</a>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p class="placeholder">Coming soon...</p>
		{/if}
	</section>
{/if}

<style>
	.projects {
		padding: 4rem 2rem;
		text-align: center;
	}

	h2 {
		font-size: 1.5rem;
		color: var(--text);
		margin-bottom: 2rem;
	}

	.project-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		max-width: 900px;
		margin: 0 auto;
	}

	.project-item {
		padding: 1.5rem;
		background-color: var(--surface0);
		border-radius: 8px;
		text-align: left;
	}

	.project-item h3 {
		color: var(--text);
		margin-bottom: 0.5rem;
	}

	.project-item p {
		color: var(--subtext);
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}

	.placeholder {
		color: var(--surface2);
	}
</style>
