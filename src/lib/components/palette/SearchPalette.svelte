<script lang="ts">
	import { config, themes } from '$lib/config';
	import { theme } from '$lib/stores/theme';
	import { scrollTo } from '$lib/keybindings/navigation';
	import { onMount } from 'svelte';

	interface Command {
		key: string;
		label: string;
		category: string;
		action: () => void;
	}

	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let inputElement: HTMLInputElement;

	const pages: Command[] = [
		{ key: 'h', label: 'Home', category: 'Page', action: () => scrollTo('page-hero') },
		{
			key: 'e',
			label: 'Experience',
			category: 'Page',
			action: () => scrollTo('page-experience')
		},
		{ key: 't', label: 'Tech & OSS', category: 'Page', action: () => scrollTo('page-tech') },
		{ key: 'l', label: 'Tools & Fun', category: 'Page', action: () => scrollTo('page-tools') },
		{ key: 'c', label: 'Contact', category: 'Page', action: () => scrollTo('page-contact') },
		{ key: 'b', label: 'Blog', category: 'Page', action: () => (window.location.href = '/blog') }
	];

	const themeKeys: Command[] = themes.map((t, i) => ({
		key: String(i + 1),
		label: t.name,
		category: 'Theme',
		action: () => theme.set(t.id)
	}));

	const allCommands: Command[] = [
		...pages,
		...themeKeys,
		{
			key: 'G',
			label: 'Open GitHub',
			category: 'Link',
			action: () => window.open(config.contact.github, '_blank')
		},
		{
			key: 'L',
			label: 'Open LinkedIn',
			category: 'Link',
			action: () => window.open(config.contact.linkedin, '_blank')
		},
		{
			key: 'E',
			label: 'Send Email',
			category: 'Link',
			action: () => (window.location.href = `mailto:${config.contact.email}`)
		}
	];

	$effect(() => {
		if (selectedIndex >= filteredCommands.length) {
			selectedIndex = Math.max(0, filteredCommands.length - 1);
		}
	});

	const filteredCommands = $derived(
		searchQuery
			? allCommands.filter((cmd) => cmd.label.toLowerCase().includes(searchQuery.toLowerCase()))
			: allCommands
	);

	let { onCommand, onClose }: { onCommand: (cmd: Command) => void; onClose: () => void } = $props();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault();
			onClose();
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = (selectedIndex + 1) % filteredCommands.length;
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
		} else if (event.key === 'Enter') {
			event.preventDefault();
			if (filteredCommands[selectedIndex]) {
				onCommand(filteredCommands[selectedIndex]);
			}
		}
	}

	onMount(() => {
		setTimeout(() => inputElement?.focus(), 10);
	});
</script>

<div class="backdrop" onclick={onClose} role="presentation">
	<div class="palette" onclick={(e) => e.stopPropagation()} role="dialog">
		<div class="search-container">
			<span class="prompt">&gt;</span>
			<input
				bind:this={inputElement}
				bind:value={searchQuery}
				onkeydown={handleKeydown}
				type="text"
				placeholder="Search..."
				class="search-input"
			/>
			<kbd class="hint">esc</kbd>
		</div>
		<div class="commands">
			{#each filteredCommands as command, i}
				<button
					class="command"
					class:selected={i === selectedIndex}
					onclick={() => onCommand(command)}
					onmouseenter={() => (selectedIndex = i)}
				>
					<span class="command-label">{command.label}</span>
					<span class="command-category">{command.category}</span>
				</button>
			{/each}
			{#if filteredCommands.length === 0}
				<div class="no-results">No results</div>
			{/if}
		</div>
		<div class="search-footer">
			<span><kbd>↑↓</kbd> navigate</span>
			<span><kbd>↵</kbd> select</span>
		</div>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 15vh;
		z-index: 1000;
	}

	.palette {
		width: 90%;
		max-width: 400px;
		background-color: var(--mantle);
		border: 1px solid var(--surface0);
		border-radius: 8px;
		overflow: hidden;
	}

	.search-container {
		display: flex;
		align-items: center;
		padding: 0.75rem;
		border-bottom: 1px solid var(--surface0);
		gap: 0.5rem;
	}

	.prompt {
		color: var(--accent);
		font-weight: bold;
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		color: var(--text);
		font-family: 'Fira Code', monospace;
		font-size: 0.9rem;
		outline: none;
	}

	.search-input::placeholder {
		color: var(--subtext);
	}

	.hint {
		font-size: 0.65rem;
		padding: 0.15rem 0.3rem;
		background-color: var(--surface0);
		color: var(--subtext);
		border-radius: 3px;
	}

	.commands {
		max-height: 250px;
		overflow-y: auto;
	}

	.command {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0.5rem 0.75rem;
		background: transparent;
		border: none;
		color: var(--text);
		font-family: 'Fira Code', monospace;
		font-size: 0.85rem;
		cursor: pointer;
		text-align: left;
	}

	.command.selected {
		background-color: var(--surface0);
	}

	.command-label {
		color: var(--text);
	}

	.command-category {
		font-size: 0.7rem;
		color: var(--subtext);
	}

	.no-results {
		padding: 1.5rem;
		text-align: center;
		color: var(--subtext);
		font-size: 0.85rem;
	}

	.search-footer {
		display: flex;
		justify-content: center;
		gap: 1rem;
		padding: 0.5rem;
		border-top: 1px solid var(--surface0);
		background-color: var(--crust);
		font-size: 0.7rem;
		color: var(--subtext);
	}

	.search-footer kbd {
		font-size: 0.65rem;
		padding: 0.1rem 0.25rem;
		background-color: var(--surface0);
		border-radius: 3px;
	}
</style>
