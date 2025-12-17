<script lang="ts">
	import { config } from '$lib/config';
	import { reveal } from '$lib/actions/reveal';
</script>

{#if config.features.showExperience && config.experience_timeline?.length}
	<section class="experience" use:reveal>
		<h2>Experience</h2>
		<div class="timeline">
			{#each config.experience_timeline as job, i}
				<div class="timeline-item" class:current={job.current}>
					<div class="timeline-marker"></div>
					<div class="timeline-content">
						<div class="timeline-header">
							<h3>{job.role}</h3>
							<span class="company">{job.company}</span>
						</div>
						<span class="period">{job.period}</span>
						{#if job.description}
							<p class="description">{job.description}</p>
						{/if}
						{#if job.tech?.length}
							<div class="tech-tags">
								{#each job.tech as tech}
									<span class="tech-tag">{tech}</span>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.experience {
		padding: 4rem 2rem;
		background-color: var(--mantle);
	}

	h2 {
		font-size: 1.5rem;
		color: var(--text);
		text-align: center;
		margin-bottom: 3rem;
	}

	.timeline {
		max-width: 700px;
		margin: 0 auto;
		position: relative;
		padding-left: 2rem;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 2px;
		background-color: var(--surface1);
	}

	.timeline-item {
		position: relative;
		padding-bottom: 2.5rem;
	}

	.timeline-item:last-child {
		padding-bottom: 0;
	}

	.timeline-marker {
		position: absolute;
		left: -2rem;
		top: 0.25rem;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: var(--surface2);
		border: 2px solid var(--mantle);
		transform: translateX(-5px);
	}

	.timeline-item.current .timeline-marker {
		background-color: var(--accent);
		box-shadow: 0 0 0 4px var(--surface0);
	}

	.timeline-content {
		background-color: var(--surface0);
		padding: 1.25rem;
		border-radius: 8px;
	}

	.timeline-header {
		margin-bottom: 0.25rem;
	}

	h3 {
		font-size: 1.1rem;
		color: var(--text);
		font-weight: 600;
	}

	.company {
		color: var(--accent);
		font-size: 0.95rem;
	}

	.period {
		display: block;
		font-size: 0.8rem;
		color: var(--subtext);
		margin-bottom: 0.75rem;
	}

	.description {
		font-size: 0.9rem;
		color: var(--subtext);
		line-height: 1.5;
		margin-bottom: 0.75rem;
	}

	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tech-tag {
		font-size: 0.75rem;
		padding: 0.2rem 0.5rem;
		background-color: var(--surface1);
		color: var(--subtext);
		border-radius: 3px;
	}
</style>
