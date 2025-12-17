<script lang="ts">
	import { config } from '$lib/config';
	import { reveal } from '$lib/actions/reveal';
</script>

{#if config.features.showSkills && config.skills?.length}
	<section class="skills" use:reveal>
		<h2>Skills</h2>
		<div class="skills-grid">
			{#each config.skills as skill, i}
				<div class="skill-item" style="--delay: {i * 100}ms">
					<div class="skill-header">
						<span class="skill-name">{skill.name}</span>
						<span class="skill-level">{skill.level}%</span>
					</div>
					<div class="skill-bar">
						<div class="skill-fill" style="--level: {skill.level}%"></div>
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.skills {
		padding: 4rem 2rem;
		text-align: center;
	}

	h2 {
		font-size: 1.5rem;
		color: var(--text);
		margin-bottom: 2rem;
	}

	.skills-grid {
		max-width: 500px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.skill-item {
		text-align: left;
		animation: slideIn 0.5s ease forwards;
		animation-delay: var(--delay);
		opacity: 0;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(-20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.skill-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.skill-name {
		color: var(--text);
		font-size: 0.9rem;
	}

	.skill-level {
		color: var(--subtext);
		font-size: 0.8rem;
	}

	.skill-bar {
		height: 8px;
		background-color: var(--surface0);
		border-radius: 4px;
		overflow: hidden;
	}

	.skill-fill {
		height: 100%;
		width: var(--level);
		background: linear-gradient(90deg, var(--accent), var(--secondary));
		border-radius: 4px;
		animation: fillBar 1s ease forwards;
		animation-delay: var(--delay);
		transform-origin: left;
		transform: scaleX(0);
	}

	@keyframes fillBar {
		to {
			transform: scaleX(1);
		}
	}
</style>
