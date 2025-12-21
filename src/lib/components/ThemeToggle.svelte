<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { themes, type Theme } from '$lib/config';

	let isOpen = $state(false);
	let container: HTMLDivElement;

	function selectTheme(t: Theme) {
		theme.set(t);
		isOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (isOpen && container && !container.contains(event.target as Node)) {
			isOpen = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} onclick={handleClickOutside} />

<div class="theme-toggle" bind:this={container}>
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
			{#each themes as t, i}
				{#if i > 0}
					<div class="divider"></div>
				{/if}
				<button
					class="theme-option"
					class:active={$theme === t.id}
					class:disabled={t.id === 'latte'}
					onclick={() => t.id !== 'latte' && selectTheme(t.id)}
					role="menuitem"
					aria-disabled={t.id === 'latte'}
				>
					<span class="option-icon">{t.icon}</span>
					<span class="option-name">{t.name}</span>
					{#if t.id === 'latte'}
						<span class="option-note">nah</span>
					{/if}
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
		padding: 0.5rem 0;
		min-width: 150px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		z-index: 100;
	}

	.divider {
		height: 1px;
		background: var(--surface1);
		margin: 0.25rem 0.75rem;
	}

	.theme-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.6rem 0.75rem;
		background: none;
		border: none;
		border-left: 2px solid transparent;
		cursor: pointer;
		color: var(--subtext);
		font-family: inherit;
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.theme-option:hover:not(.disabled) {
		background: var(--surface1);
		color: var(--text);
	}

	.theme-option.active {
		background: var(--surface1);
		color: var(--accent);
		border-left-color: var(--surface2);
	}

	.theme-option.disabled {
		color: var(--surface2);
		cursor: not-allowed;
	}

	.option-icon {
		font-size: 1rem;
	}

	.option-note {
		margin-left: auto;
		font-size: 0.7rem;
		color: var(--red);
		font-style: italic;
	}
</style>
