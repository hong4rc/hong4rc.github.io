<script lang="ts">
	import { config, themes, type Theme } from '$lib/config';
	import { theme } from '$lib/stores/theme';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	interface Command {
		id: string;
		label: string;
		category: string;
		shortcut?: string;
		action: () => void;
	}

	let isOpen = false;
	let searchQuery = '';
	let selectedIndex = 0;
	let inputElement: HTMLInputElement;

	const commands: Command[] = [
		{
			id: 'home',
			label: 'Go to Home',
			category: 'Navigation',
			action: () => scrollTo('hero')
		},
		{
			id: 'tech',
			label: 'Go to Tech Stack',
			category: 'Navigation',
			action: () => scrollTo('tech-stack')
		},
		{
			id: 'experience',
			label: 'Go to Experience',
			category: 'Navigation',
			action: () => scrollTo('experience')
		},
		{
			id: 'github-section',
			label: 'Go to GitHub Stats',
			category: 'Navigation',
			action: () => scrollTo('github-stats')
		},
		{
			id: 'contact',
			label: 'Go to Contact',
			category: 'Navigation',
			action: () => scrollTo('contact')
		},
		...themes.map((t) => ({
			id: `theme-${t.id}`,
			label: `Theme: ${t.name}`,
			category: 'Theme',
			action: () => theme.set(t.id)
		})),
		{
			id: 'github',
			label: 'Open GitHub',
			category: 'Links',
			action: () => window.open(config.contact.github, '_blank')
		},
		{
			id: 'linkedin',
			label: 'Open LinkedIn',
			category: 'Links',
			action: () => window.open(config.contact.linkedin, '_blank')
		},
		{
			id: 'email',
			label: 'Send Email',
			category: 'Links',
			action: () => (window.location.href = `mailto:${config.contact.email}`)
		}
	];

	$: filteredCommands = searchQuery
		? commands.filter(
				(cmd) =>
					cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
					cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
			)
		: commands;

	$: if (selectedIndex >= filteredCommands.length) {
		selectedIndex = Math.max(0, filteredCommands.length - 1);
	}

	function scrollTo(id: string) {
		const element = document.querySelector(`.${id}`);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function open() {
		isOpen = true;
		searchQuery = '';
		selectedIndex = 0;
		setTimeout(() => inputElement?.focus(), 10);
	}

	function close() {
		isOpen = false;
	}

	function executeCommand(command: Command) {
		command.action();
		close();
	}

	function handleKeydown(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
			event.preventDefault();
			if (isOpen) {
				close();
			} else {
				open();
			}
			return;
		}

		if (!isOpen) return;

		switch (event.key) {
			case 'Escape':
				close();
				break;
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = (selectedIndex + 1) % filteredCommands.length;
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
				break;
			case 'Enter':
				event.preventDefault();
				if (filteredCommands[selectedIndex]) {
					executeCommand(filteredCommands[selectedIndex]);
				}
				break;
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			close();
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeydown);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

{#if isOpen}
	<div class="backdrop" on:click={handleBackdropClick} role="presentation">
		<div class="palette">
			<div class="search-container">
				<span class="prompt">&gt;</span>
				<input
					bind:this={inputElement}
					bind:value={searchQuery}
					type="text"
					placeholder="Type a command..."
					class="search-input"
				/>
				<kbd class="hint">esc</kbd>
			</div>
			<div class="commands">
				{#each filteredCommands as command, i}
					<button
						class="command"
						class:selected={i === selectedIndex}
						on:click={() => executeCommand(command)}
						on:mouseenter={() => (selectedIndex = i)}
					>
						<span class="command-label">{command.label}</span>
						<span class="command-category">{command.category}</span>
					</button>
				{/each}
				{#if filteredCommands.length === 0}
					<div class="no-results">No commands found</div>
				{/if}
			</div>
			<div class="footer">
				<span><kbd>↑↓</kbd> navigate</span>
				<span><kbd>↵</kbd> select</span>
				<span><kbd>esc</kbd> close</span>
			</div>
		</div>
	</div>
{/if}

<button class="trigger" on:click={open} aria-label="Open command palette">
	<kbd>⌘K</kbd>
</button>

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
		max-width: 500px;
		background-color: var(--mantle);
		border: 1px solid var(--surface0);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.search-container {
		display: flex;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid var(--surface0);
		gap: 0.75rem;
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
		font-size: 1rem;
		outline: none;
	}

	.search-input::placeholder {
		color: var(--surface2);
	}

	.hint {
		font-size: 0.7rem;
		padding: 0.2rem 0.4rem;
		background-color: var(--surface0);
		color: var(--subtext);
		border-radius: 4px;
	}

	.commands {
		max-height: 300px;
		overflow-y: auto;
	}

	.command {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0.75rem 1rem;
		background: transparent;
		border: none;
		color: var(--text);
		font-family: 'Fira Code', monospace;
		font-size: 0.9rem;
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
		font-size: 0.75rem;
		color: var(--subtext);
	}

	.no-results {
		padding: 2rem;
		text-align: center;
		color: var(--subtext);
	}

	.footer {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		padding: 0.75rem;
		border-top: 1px solid var(--surface0);
		background-color: var(--crust);
		font-size: 0.75rem;
		color: var(--subtext);
	}

	.footer kbd {
		font-size: 0.7rem;
		padding: 0.15rem 0.3rem;
		background-color: var(--surface0);
		border-radius: 3px;
		margin-right: 0.25rem;
	}

	.trigger {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		background-color: var(--surface0);
		border: 1px solid var(--surface1);
		border-radius: 8px;
		padding: 0.5rem 0.75rem;
		color: var(--subtext);
		font-family: 'Fira Code', monospace;
		font-size: 0.85rem;
		cursor: pointer;
		transition: all 0.2s ease;
		z-index: 100;
	}

	.trigger:hover {
		background-color: var(--surface1);
		color: var(--text);
	}

	.trigger kbd {
		pointer-events: none;
	}
</style>
