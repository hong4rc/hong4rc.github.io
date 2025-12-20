<script lang="ts">
	import { config } from '$lib/config';
	import { reveal } from '$lib/actions/reveal';
	import { addUTM } from '$lib/utils/utm';
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
							<li>
								<a href={addUTM(item.url, { content: 'tools' })} target="_blank" rel="noopener noreferrer">{item.name}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.tools {
		padding: 2rem 2rem 1rem;
		text-align: center;
	}

	h2 {
		font-size: 1.25rem;
		color: var(--text);
		margin-bottom: 1.5rem;
	}

	.tools-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		max-width: 700px;
		margin: 0 auto;
	}

	.tool-group {
		text-align: left;
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
		padding: 0.2rem 0;
	}

	li a {
		color: var(--text);
		text-decoration: none;
		transition: color 0.2s;
	}

	li a:hover {
		color: var(--accent);
	}

	@media (max-width: 480px) {
		.tools {
			padding: 1.5rem 1rem;
		}

		.tools-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.75rem;
		}

		.tool-group {
			padding: 0.75rem;
		}

		h3 {
			font-size: 0.65rem;
		}

		li {
			font-size: 0.8rem;
		}
	}
</style>
