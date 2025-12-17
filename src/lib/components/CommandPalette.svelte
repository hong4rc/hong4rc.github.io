<script lang="ts">
	import { config, themes } from '$lib/config';
	import { theme } from '$lib/stores/theme';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	interface Command {
		key: string;
		label: string;
		action: () => void;
	}

	let showWhichKey = false;
	let showSearch = false;
	let leaderPressed = false;
	let leaderTimeout: number | null = null;
	let searchQuery = '';
	let selectedIndex = 0;
	let inputElement: HTMLInputElement;

	const keys = config.keys;

	const sections: Command[] = [
		{ key: keys.sections.home, label: 'Home', action: () => scrollTo('hero') },
		{ key: keys.sections.tech, label: 'Tech Stack', action: () => scrollTo('tech-stack') },
		{ key: keys.sections.skills, label: 'Skills', action: () => scrollTo('skills') },
		{ key: keys.sections.experience, label: 'Experience', action: () => scrollTo('experience') },
		{ key: keys.sections.opensource, label: 'Open Source', action: () => scrollTo('opensource') },
		{ key: keys.sections.tools, label: 'Tools', action: () => scrollTo('tools') },
		{ key: keys.sections.github, label: 'GitHub', action: () => scrollTo('github-stats') },
		{ key: keys.sections.contact, label: 'Contact', action: () => scrollTo('contact') },
		{ key: keys.sections.availability, label: 'Availability', action: () => scrollTo('availability') }
	];

	const themeKeys: Command[] = themes.map((t, i) => ({
		key: String(i + 1),
		label: t.name,
		action: () => theme.set(t.id)
	}));

	const allCommands = [
		...sections.map((s) => ({ ...s, category: 'Section' })),
		...themeKeys.map((t) => ({ ...t, category: 'Theme' })),
		{ key: 'G', label: 'Open GitHub', category: 'Link', action: () => window.open(config.contact.github, '_blank') },
		{ key: 'L', label: 'Open LinkedIn', category: 'Link', action: () => window.open(config.contact.linkedin, '_blank') },
		{ key: 'E', label: 'Send Email', category: 'Link', action: () => (window.location.href = `mailto:${config.contact.email}`) }
	];

	$: filteredCommands = searchQuery
		? allCommands.filter((cmd) =>
				cmd.label.toLowerCase().includes(searchQuery.toLowerCase())
			)
		: allCommands;

	$: if (selectedIndex >= filteredCommands.length) {
		selectedIndex = Math.max(0, filteredCommands.length - 1);
	}

	function scrollTo(className: string) {
		const element = document.querySelector(`.${className}`);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function closeAll() {
		showWhichKey = false;
		showSearch = false;
		leaderPressed = false;
		if (leaderTimeout) clearTimeout(leaderTimeout);
	}

	function openSearch() {
		showWhichKey = false;
		showSearch = true;
		searchQuery = '';
		selectedIndex = 0;
		setTimeout(() => inputElement?.focus(), 10);
	}

	function moveDown() {
		selectedIndex = (selectedIndex + 1) % filteredCommands.length;
	}

	function moveUp() {
		selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
	}

	function selectCurrent() {
		if (filteredCommands[selectedIndex]) {
			filteredCommands[selectedIndex].action();
			closeAll();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		// Search mode - handle navigation in input
		if (showSearch) {
			const key = event.key;

			if (key === 'Escape') {
				event.preventDefault();
				closeAll();
				return;
			}

			if (key === 'Enter') {
				event.preventDefault();
				selectCurrent();
				return;
			}

			if (key === 'ArrowDown' || keys.down.includes(key)) {
				// Only intercept j/n if Ctrl is held (to allow typing)
				if (key === 'ArrowDown' || event.ctrlKey) {
					event.preventDefault();
					moveDown();
					return;
				}
			}

			if (key === 'ArrowUp' || keys.up.includes(key)) {
				if (key === 'ArrowUp' || event.ctrlKey) {
					event.preventDefault();
					moveUp();
					return;
				}
			}

			// Let other keys through for typing
			return;
		}

		// Ignore if typing in other inputs
		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
			return;
		}

		// Leader key (Space)
		if (event.code === 'Space' && !event.metaKey && !event.ctrlKey && !event.altKey) {
			event.preventDefault();

			if (leaderPressed) {
				// Space Space = open search
				if (leaderTimeout) clearTimeout(leaderTimeout);
				openSearch();
				leaderPressed = false;
				return;
			}

			leaderPressed = true;
			showWhichKey = true;

			// Auto-hide after 3s if no action
			leaderTimeout = setTimeout(() => {
				if (showWhichKey && !showSearch) {
					closeAll();
				}
			}, 3000) as unknown as number;
			return;
		}

		// If leader is pressed, handle shortcuts
		if (leaderPressed && showWhichKey) {
			event.preventDefault();
			const key = event.key;

			// Find matching command
			const cmd = [...sections, ...themeKeys].find((c) => c.key === key);
			if (cmd) {
				cmd.action();
				closeAll();
				return;
			}

			// Capital letters for links
			if (key === 'G') {
				window.open(config.contact.github, '_blank');
				closeAll();
				return;
			}
			if (key === 'L') {
				window.open(config.contact.linkedin, '_blank');
				closeAll();
				return;
			}
			if (key === 'E') {
				window.location.href = `mailto:${config.contact.email}`;
				closeAll();
				return;
			}

			// Escape to close
			if (key === 'Escape') {
				closeAll();
				return;
			}
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
			if (leaderTimeout) clearTimeout(leaderTimeout);
		}
	});
</script>

<!-- Which-key popup -->
{#if showWhichKey && !showSearch}
	<div class="which-key">
		<div class="which-key-header">
			<kbd>SPC</kbd> + key
		</div>
		<div class="which-key-grid">
			<div class="which-key-group">
				<span class="group-title">Sections</span>
				{#each sections as cmd}
					<div class="which-key-item">
						<kbd>{cmd.key}</kbd>
						<span>{cmd.label}</span>
					</div>
				{/each}
			</div>
			<div class="which-key-group">
				<span class="group-title">Theme</span>
				{#each themeKeys as cmd}
					<div class="which-key-item">
						<kbd>{cmd.key}</kbd>
						<span>{cmd.label}</span>
					</div>
				{/each}
			</div>
			<div class="which-key-group">
				<span class="group-title">Links</span>
				<div class="which-key-item"><kbd>G</kbd><span>GitHub</span></div>
				<div class="which-key-item"><kbd>L</kbd><span>LinkedIn</span></div>
				<div class="which-key-item"><kbd>E</kbd><span>Email</span></div>
			</div>
			<div class="which-key-group">
				<span class="group-title">Search</span>
				<div class="which-key-item"><kbd>SPC</kbd><span>Open</span></div>
			</div>
		</div>
	</div>
{/if}

<!-- Search palette -->
{#if showSearch}
	<div class="backdrop" on:click={closeAll} role="presentation">
		<div class="palette">
			<div class="search-container">
				<span class="prompt">&gt;</span>
				<input
					bind:this={inputElement}
					bind:value={searchQuery}
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
						on:click={() => { command.action(); closeAll(); }}
						on:mouseenter={() => (selectedIndex = i)}
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
				<span><kbd>↑↓</kbd> or <kbd>ctrl+{keys.up[1]}/{keys.down[1]}</kbd></span>
				<span><kbd>↵</kbd> select</span>
			</div>
		</div>
	</div>
{/if}

<!-- Trigger hint -->
<div class="trigger">
	<kbd>SPC</kbd>
</div>

<style>
	.which-key {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		background-color: var(--mantle);
		border: 1px solid var(--surface0);
		border-radius: 8px;
		padding: 0.75rem;
		z-index: 1000;
		font-size: 0.8rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.which-key-header {
		color: var(--subtext);
		margin-bottom: 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--surface0);
	}

	.which-key-grid {
		display: flex;
		gap: 1.5rem;
	}

	.which-key-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.group-title {
		color: var(--accent);
		font-size: 0.7rem;
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.which-key-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text);
	}

	.which-key-item kbd {
		min-width: 1.2rem;
		text-align: center;
		padding: 0.1rem 0.3rem;
		background-color: var(--surface0);
		border-radius: 3px;
		color: var(--accent);
		font-size: 0.7rem;
	}

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
		color: var(--surface2);
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

	.trigger {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		background-color: var(--surface0);
		border-radius: 6px;
		padding: 0.4rem 0.6rem;
		color: var(--subtext);
		font-size: 0.75rem;
		z-index: 100;
	}

	.trigger kbd {
		color: var(--accent);
	}

	/* Hide trigger when which-key is shown */
	.which-key ~ .trigger {
		display: none;
	}
</style>
