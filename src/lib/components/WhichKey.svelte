<script lang="ts">
	interface KeyGroup {
		title: string;
		keys: { key: string; label: string }[];
	}

	let { groups = [], show = false, onclose }: { groups: KeyGroup[]; show: boolean; onclose: () => void } = $props();
</script>

{#if show}
	<div class="which-key">
		<div class="which-key-header">
			<span>Keybindings</span>
			<button onclick={onclose} aria-label="Close">×</button>
		</div>
		<div class="which-key-grid">
			{#each groups as group}
				<div class="which-key-group">
					<span class="group-title">{group.title}</span>
					{#each group.keys as item}
						<div class="which-key-item">
							<kbd>{item.key}</kbd>
							<span>{item.label}</span>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
{:else}
	<button class="vim-hint" onclick={() => show = true} aria-label="Show keybindings">
		<kbd>?</kbd> keys
	</button>
{/if}

<style>
	.which-key {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		background-color: var(--surface0);
		border: 1px solid var(--surface1);
		border-radius: 8px;
		padding: 1rem;
		z-index: 100;
		max-width: 320px;
	}

	.which-key-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--surface1);
		font-weight: 600;
		color: var(--text);
		font-size: 0.85rem;
	}

	.which-key-header button {
		background: none;
		border: none;
		color: var(--subtext);
		cursor: pointer;
		font-size: 1.2rem;
		line-height: 1;
		padding: 0;
	}

	.which-key-header button:hover {
		color: var(--text);
	}

	.which-key-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.which-key-group {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		min-width: 120px;
	}

	.group-title {
		font-size: 0.65rem;
		text-transform: uppercase;
		color: var(--subtext);
		letter-spacing: 0.05em;
		margin-bottom: 0.2rem;
	}

	.which-key-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: var(--subtext);
	}

	.which-key-item kbd {
		background-color: var(--surface1);
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
		font-size: 0.7rem;
		color: var(--text);
		font-family: inherit;
		min-width: 1.5rem;
		text-align: center;
	}

	.vim-hint {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		background-color: var(--surface0);
		border: 1px solid var(--surface1);
		padding: 0.4rem 0.6rem;
		border-radius: 4px;
		font-size: 0.7rem;
		color: var(--text);
		cursor: pointer;
		transition: all 0.2s;
		font-family: inherit;
	}

	.vim-hint:hover {
		background-color: var(--surface1);
		color: var(--text);
	}

	.vim-hint kbd {
		background-color: var(--surface1);
		padding: 0.1rem 0.3rem;
		border-radius: 2px;
		margin-right: 0.3rem;
		color: var(--text);
	}
</style>
