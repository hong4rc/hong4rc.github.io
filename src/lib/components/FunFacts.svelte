<script lang="ts">
	import { config } from '$lib/config';
	import { reveal } from '$lib/actions/reveal';
</script>

{#if config.features.showFunFacts}
	<section class="fun-facts" use:reveal>
		<h2>Fun Facts</h2>
		<div class="facts-grid">
			{#each config.funFacts as fact}
				<div class="fact-card">
					<span class="fact-icon">{fact.icon}</span>
					<div class="fact-content">
						<h3>{fact.title}</h3>
						<p>{fact.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.fun-facts {
		padding: 1rem 2rem 2rem;
		background-color: var(--base);
	}

	h2 {
		font-size: 1.25rem;
		color: var(--text);
		text-align: center;
		margin-bottom: 1rem;
	}

	.facts-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
		max-width: 900px;
		margin: 0 auto;
	}

	@media (max-width: 768px) {
		.facts-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.fact-card {
			display: flex;
			align-items: center;
			gap: 1rem;
			text-align: left;
			padding: 1rem;
		}

		.fact-icon {
			font-size: 1.5rem;
			margin-bottom: 0;
			flex-shrink: 0;
		}

		.fact-content {
			flex: 1;
		}

		h3 {
			margin-bottom: 0.25rem;
		}

		p {
			font-size: 0.8rem;
		}
	}

	.fact-card {
		background-color: var(--surface0);
		padding: 1.5rem;
		border-radius: 8px;
		text-align: center;
		transition: transform 0.2s, background-color 0.2s;
	}

	.fact-card:hover {
		background-color: var(--surface1);
		transform: translateY(-3px);
	}

	.fact-icon {
		font-size: 2rem;
		display: block;
		margin-bottom: 0.75rem;
	}

	h3 {
		font-size: 1rem;
		color: var(--accent);
		margin-bottom: 0.5rem;
	}

	p {
		font-size: 0.85rem;
		color: var(--subtext);
		line-height: 1.4;
	}
</style>
