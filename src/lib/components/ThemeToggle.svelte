<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { themes, type Theme } from '$lib/config';

	let isOpen = $state(false);

	function selectTheme(t: Theme) {
		theme.set(t);
		isOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="theme-toggle">
	<button
		class="toggle-btn"
		onclick={() => (isOpen = !isOpen)}
		aria-label="Toggle theme menu"
		aria-expanded={isOpen}
	>
		<span class="icon">{themes.find((t) => t.id === $theme)?.icon ?? '🎨'}</span>
	</button>

	{#if isOpen}
		<div class="dropdown" role="menu">
			{#each themes as t}
				<button
					class="theme-option"
					class:active={$theme === t.id}
					onclick={() => selectTheme(t.id)}
					role="menuitem"
				>
					<span class="option-icon">{t.icon}</span>
					<span class="option-name">{t.name}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.theme-toggle {
		position: relative;
	}

	.toggle-btn {
		background: var(--surface0);
		border: none;
		border-radius: 8px;
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.toggle-btn:hover {
		background: var(--surface1);
	}

	.icon {
		font-size: 1.2rem;
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		background: var(--surface0);
		border-radius: 8px;
		padding: 0.5rem;
		min-width: 140px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		z-index: 100;
	}

	.theme-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.5rem 0.75rem;
		background: none;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		color: var(--subtext);
		font-family: inherit;
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.theme-option:hover {
		background: var(--surface1);
		color: var(--text);
	}

	.theme-option.active {
		background: var(--surface1);
		color: var(--accent);
	}

	.option-icon {
		font-size: 1rem;
	}
</style>
