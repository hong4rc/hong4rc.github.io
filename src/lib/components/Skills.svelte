<script lang="ts">
	import { config } from '$lib/config';
	import { reveal } from '$lib/actions/reveal';
	import { getTechColor, getTechIcon } from '$lib/techColors';
</script>

{#if config.features.showSkills && config.skills?.length}
	<section class="skills" use:reveal>
		<h2>Skills</h2>
		<div class="skills-grid">
			{#each config.skills as skill, i}
				<div class="skill-item" style="--delay: {i * 50}ms; --color: {getTechColor(skill.name)}">
					<span class="skill-icon">{getTechIcon(skill.name)}</span>
					<span class="skill-name">{skill.name}</span>
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
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.skill-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: var(--surface0);
		border-radius: 6px;
		border-left: 3px solid var(--color);
		animation: fadeIn 0.4s ease forwards;
		animation-delay: var(--delay);
		opacity: 0;
		cursor: pointer;
		user-select: none;
		transition: all 0.2s ease;
	}

	.skill-item:hover {
		background-color: var(--surface1);
		transform: translateY(-2px);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.skill-icon {
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--color);
		background-color: var(--surface1);
		padding: 0.25rem 0.4rem;
		border-radius: 4px;
	}

	.skill-name {
		color: var(--text);
		font-size: 0.9rem;
	}
</style>
