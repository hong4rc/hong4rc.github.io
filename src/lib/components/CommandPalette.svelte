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
	let showGoTo = false;
	let leaderPressed = false;
	let gPressed = false;
	let leaderTimeout: number | null = null;
	let gTimeout: number | null = null;
	let searchQuery = '';
	let selectedIndex = 0;
	let inputElement: HTMLInputElement;

	const pageOrder = ['page-hero', 'page-experience', 'page-tech', 'page-tools', 'page-contact'];

	const pages: Command[] = [
		{ key: 'h', label: 'Home', action: () => scrollTo('page-hero') },
		{ key: 'e', label: 'Experience', action: () => scrollTo('page-experience') },
		{ key: 't', label: 'Tech & OSS', action: () => scrollTo('page-tech') },
		{ key: 'l', label: 'Tools & Fun', action: () => scrollTo('page-tools') },
		{ key: 'c', label: 'Contact', action: () => scrollTo('page-contact') }
	];

	const themeKeys: Command[] = themes.map((t, i) => ({
		key: String(i + 1),
		label: t.name,
		action: () => theme.set(t.id)
	}));

	const allCommands = [
		...pages.map((s) => ({ ...s, category: 'Page' })),
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

	function getCurrentPageIndex(): number {
		const scrollY = window.scrollY + window.innerHeight / 2;
		for (let i = pageOrder.length - 1; i >= 0; i--) {
			const el = document.querySelector(`.${pageOrder[i]}`);
			if (el && (el as HTMLElement).offsetTop <= scrollY) {
				return i;
			}
		}
		return 0;
	}

	function goToNextPage() {
		const current = getCurrentPageIndex();
		const next = Math.min(current + 1, pageOrder.length - 1);
		scrollTo(pageOrder[next]);
	}

	function goToPrevPage() {
		const current = getCurrentPageIndex();
		if (current === 0) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			scrollTo(pageOrder[current - 1]);
		}
	}

	function goToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function goToBottom() {
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	}

	function halfPageDown() {
		window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
	}

	function halfPageUp() {
		window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' });
	}

	function fullPageDown() {
		window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
	}

	function fullPageUp() {
		window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
	}

	function centerCurrentPage() {
		const current = getCurrentPageIndex();
		const el = document.querySelector(`.${pageOrder[current]}`);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	function cycleTheme() {
		const themeOrder = ['latte', 'frappe', 'macchiato', 'mocha'] as const;
		const currentTheme = document.documentElement.getAttribute('data-theme') || 'frappe';
		const currentIndex = themeOrder.indexOf(currentTheme as typeof themeOrder[number]);
		const nextIndex = (currentIndex + 1) % themeOrder.length;
		theme.set(themeOrder[nextIndex]);
	}

	function closeAll() {
		showWhichKey = false;
		showSearch = false;
		showGoTo = false;
		leaderPressed = false;
		gPressed = false;
		if (leaderTimeout) clearTimeout(leaderTimeout);
		if (gTimeout) clearTimeout(gTimeout);
	}

	function openSearch() {
		showWhichKey = false;
		showSearch = true;
		searchQuery = '';
		selectedIndex = 0;
		setTimeout(() => inputElement?.focus(), 10);
	}

	function handleKeydown(event: KeyboardEvent) {
		// Search mode
		if (showSearch) {
			if (event.key === 'Escape') {
				event.preventDefault();
				closeAll();
				return;
			}
			if (event.key === 'Enter') {
				event.preventDefault();
				if (filteredCommands[selectedIndex]) {
					filteredCommands[selectedIndex].action();
					closeAll();
				}
				return;
			}
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				selectedIndex = (selectedIndex + 1) % filteredCommands.length;
				return;
			}
			if (event.key === 'ArrowUp') {
				event.preventDefault();
				selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
				return;
			}
			return;
		}

		// Ignore if typing in inputs
		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
			return;
		}

		// / - open search
		if (event.key === '/' && !leaderPressed && !showWhichKey && !gPressed) {
			event.preventDefault();
			openSearch();
			return;
		}

		// ? - show help (whichkey)
		if (event.key === '?' && !leaderPressed && !gPressed) {
			event.preventDefault();
			showWhichKey = true;
			leaderPressed = true;
			leaderTimeout = setTimeout(() => {
				if (showWhichKey && !showSearch) {
					closeAll();
				}
			}, 5000) as unknown as number;
			return;
		}

		// Tab - cycle themes
		if (event.key === 'Tab' && !leaderPressed && !showWhichKey && !gPressed && !showSearch) {
			event.preventDefault();
			cycleTheme();
			return;
		}

		// Ctrl+d - half page down
		if (event.key === 'd' && event.ctrlKey && !leaderPressed && !showWhichKey) {
			event.preventDefault();
			halfPageDown();
			return;
		}

		// Ctrl+u - half page up
		if (event.key === 'u' && event.ctrlKey && !leaderPressed && !showWhichKey) {
			event.preventDefault();
			halfPageUp();
			return;
		}

		// Ctrl+f - full page down
		if (event.key === 'f' && event.ctrlKey && !leaderPressed && !showWhichKey) {
			event.preventDefault();
			fullPageDown();
			return;
		}

		// Ctrl+b - full page up
		if (event.key === 'b' && event.ctrlKey && !leaderPressed && !showWhichKey) {
			event.preventDefault();
			fullPageUp();
			return;
		}

		// j or w - next page
		if ((event.key === 'j' || event.key === 'w') && !leaderPressed && !showWhichKey && !gPressed) {
			event.preventDefault();
			goToNextPage();
			return;
		}

		// k or b - previous page (when not ctrl)
		if ((event.key === 'k' || event.key === 'b') && !event.ctrlKey && !leaderPressed && !showWhichKey && !gPressed) {
			event.preventDefault();
			goToPrevPage();
			return;
		}

		// 0 or ^ - first section
		if ((event.key === '0' || event.key === '^') && !leaderPressed && !showWhichKey && !gPressed) {
			event.preventDefault();
			goToTop();
			return;
		}

		// $ - last section
		if (event.key === '$' && !leaderPressed && !showWhichKey && !gPressed) {
			event.preventDefault();
			goToBottom();
			return;
		}

		// zz - center current page
		if (event.key === 'z' && !leaderPressed && !showWhichKey && !gPressed) {
			event.preventDefault();
			// Wait for second z
			const handleSecondZ = (e: KeyboardEvent) => {
				if (e.key === 'z') {
					e.preventDefault();
					centerCurrentPage();
				}
				window.removeEventListener('keydown', handleSecondZ);
			};
			window.addEventListener('keydown', handleSecondZ);
			setTimeout(() => window.removeEventListener('keydown', handleSecondZ), 1000);
			return;
		}

		// Arrow keys for page navigation (when not in leader mode)
		if (!leaderPressed && !showWhichKey && !gPressed) {
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				goToNextPage();
				return;
			}
			if (event.key === 'ArrowUp') {
				event.preventDefault();
				goToPrevPage();
				return;
			}
		}

		// G (uppercase) - go to end of page
		if (event.key === 'G' && !leaderPressed && !showWhichKey && !gPressed) {
			event.preventDefault();
			goToBottom();
			return;
		}

		// g key - enter go-to mode
		if (event.key === 'g' && !leaderPressed && !showWhichKey) {
			event.preventDefault();

			if (gPressed) {
				// gg - go to top
				if (gTimeout) clearTimeout(gTimeout);
				goToTop();
				gPressed = false;
				showGoTo = false;
				return;
			}

			gPressed = true;
			showGoTo = true;

			gTimeout = setTimeout(() => {
				gPressed = false;
				showGoTo = false;
			}, 2000) as unknown as number;
			return;
		}

		// g + key - go to page
		if (gPressed && showGoTo) {
			event.preventDefault();
			const key = event.key;

			const cmd = pages.find((c) => c.key === key);
			if (cmd) {
				cmd.action();
				closeAll();
				return;
			}

			if (key === 'Escape') {
				closeAll();
				return;
			}
		}

		// Leader key (Space)
		if (event.code === 'Space' && !event.metaKey && !event.ctrlKey && !event.altKey) {
			event.preventDefault();

			if (leaderPressed) {
				if (leaderTimeout) clearTimeout(leaderTimeout);
				openSearch();
				leaderPressed = false;
				return;
			}

			leaderPressed = true;
			showWhichKey = true;

			leaderTimeout = setTimeout(() => {
				if (showWhichKey && !showSearch) {
					closeAll();
				}
			}, 3000) as unknown as number;
			return;
		}

		// Leader shortcuts
		if (leaderPressed && showWhichKey) {
			event.preventDefault();
			const key = event.key;

			const cmd = [...pages, ...themeKeys].find((c) => c.key === key);
			if (cmd) {
				cmd.action();
				closeAll();
				return;
			}

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
			if (gTimeout) clearTimeout(gTimeout);
		}
	});
</script>

{#if showGoTo && !showSearch && !showWhichKey}
	<div class="which-key go-to">
		<div class="which-key-header">
			<kbd>g</kbd> + key
		</div>
		<div class="which-key-grid">
			<div class="which-key-group">
				<span class="group-title">Go to</span>
				<div class="which-key-item"><kbd>g</kbd><span>Top</span></div>
				{#each pages as cmd}
					<div class="which-key-item">
						<kbd>{cmd.key}</kbd>
						<span>{cmd.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

{#if showWhichKey && !showSearch}
	<div class="which-key">
		<div class="which-key-header">
			<kbd>SPC</kbd> + key
		</div>
		<div class="which-key-grid">
			<div class="which-key-group">
				<span class="group-title">Pages</span>
				{#each pages as cmd}
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
				<span class="group-title">Navigation</span>
				<div class="which-key-item"><kbd>/</kbd><span>Search</span></div>
				<div class="which-key-item"><kbd>j/w</kbd><span>Next</span></div>
				<div class="which-key-item"><kbd>k/b</kbd><span>Prev</span></div>
				<div class="which-key-item"><kbd>gg</kbd><span>Top</span></div>
				<div class="which-key-item"><kbd>G</kbd><span>Bottom</span></div>
			</div>
			<div class="which-key-group">
				<span class="group-title">Scroll</span>
				<div class="which-key-item"><kbd>^d</kbd><span>Half ↓</span></div>
				<div class="which-key-item"><kbd>^u</kbd><span>Half ↑</span></div>
				<div class="which-key-item"><kbd>Tab</kbd><span>Theme</span></div>
			</div>
		</div>
	</div>
{/if}

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
				<span><kbd>↑↓</kbd> navigate</span>
				<span><kbd>↵</kbd> select</span>
			</div>
		</div>
	</div>
{/if}

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

	.which-key ~ .trigger,
	.go-to ~ .trigger {
		display: none;
	}
</style>
