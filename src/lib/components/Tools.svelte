<script lang="ts">
	import { config } from '$lib/config';
	import { reveal } from '$lib/actions/reveal';
</script>

{#if config.features.showTools && config.tools?.length}
	<section class="tools" use:reveal>
		<h2>Tools I Use</h2>
		<div class="tools-grid">
			{#each config.tools as group, i}
				<div class="tool-group">
					<h3>
						<span class="icon">{group.icon}</span>
						{group.category}
					</h3>
					<ul>
						{#each group.items as item}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.tools {
		padding: 4rem 2rem;
		text-align: center;
	}

	h2 {
		font-size: 1.5rem;
		color: var(--text);
		margin-bottom: 2rem;
	}

	.tools-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, 160px);
		justify-content: center;
		gap: 1rem;
		max-width: 900px;
		margin: 0 auto;
	}

	.tool-group {
		text-align: left;
		width: 160px;
		padding: 1rem;
		background-color: var(--surface0);
		border-radius: 8px;
	}

	h3 {
		font-size: 0.7rem;
		color: var(--subtext);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.icon {
		color: var(--accent);
		font-size: 1.2rem;
	}

	ul {
		list-style: none;
	}

	li {
		font-size: 0.85rem;
		color: var(--text);
		padding: 0.2rem 0;
	}
</style>
