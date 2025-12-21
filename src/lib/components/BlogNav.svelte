<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import WhichKey from './WhichKey.svelte';

	let { posts = [] }: { posts: { slug: string; title: string; description: string }[] } = $props();

	let selectedIndex = $state(-1);
	let showHelp = $state(false);
	let leaderPressed = $state(false);
	let leaderTimeout: number | null = null;
	let showSearch = $state(false);
	let searchQuery = $state('');
	let searchSelectedIndex = $state(0);
	let inputElement: HTMLInputElement;

	let filteredPosts = $derived(
		searchQuery
			? posts.filter(p =>
				p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.description.toLowerCase().includes(searchQuery.toLowerCase())
			)
			: posts
	);

	function highlightMatch(text: string, query: string): string {
		if (!query) return text;
		const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
		return text.replace(regex, '<mark>$1</mark>');
	}

	const keyGroups = [
		{
			title: 'Navigate',
			keys: [
				{ key: 'j ↓', label: 'Next' },
				{ key: 'k ↑', label: 'Prev' },
				{ key: 'gg', label: 'First' },
				{ key: 'G', label: 'Last' },
				{ key: '1-9', label: 'Jump #' }
			]
		},
		{
			title: 'Actions',
			keys: [
				{ key: 'Enter', label: 'Open' },
				{ key: 'Esc', label: 'Deselect' }
			]
		}
	];

	const leaderGroups = [
		{
			title: 'Space +',
			keys: [
				{ key: '/', label: 'Search' },
				{ key: 'h', label: 'Home' },
				{ key: 'b', label: 'Blog' }
			]
		}
	];

	function getPostElements(): HTMLElement[] {
		return Array.from(document.querySelectorAll('.timeline-item')) as HTMLElement[];
	}

	function selectPost(index: number) {
		const postElements = getPostElements();
		if (index < 0) index = 0;
		if (index >= postElements.length) index = postElements.length - 1;

		selectedIndex = index;
		postElements.forEach((el, i) => {
			el.classList.toggle('vim-selected', i === index);
		});

		postElements[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	function openPost() {
		if (selectedIndex >= 0 && posts[selectedIndex]) {
			window.location.href = `/blog/${posts[selectedIndex].slug}`;
		}
	}

	function closeAll() {
		showHelp = false;
		leaderPressed = false;
		showSearch = false;
		if (leaderTimeout) clearTimeout(leaderTimeout);
	}

	function openSearch() {
		showSearch = true;
		searchQuery = '';
		searchSelectedIndex = 0;
		leaderPressed = false;
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
				if (filteredPosts[searchSelectedIndex]) {
					window.location.href = `/blog/${filteredPosts[searchSelectedIndex].slug}`;
				}
				return;
			}
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				searchSelectedIndex = (searchSelectedIndex + 1) % filteredPosts.length;
				return;
			}
			if (event.key === 'ArrowUp') {
				event.preventDefault();
				searchSelectedIndex = (searchSelectedIndex - 1 + filteredPosts.length) % filteredPosts.length;
				return;
			}
			return;
		}

		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
			return;
		}

		const postElements = getPostElements();
		const maxIndex = postElements.length - 1;

		// Leader key (Space)
		if (event.code === 'Space' && !event.metaKey && !event.ctrlKey && !event.altKey) {
			event.preventDefault();
			leaderPressed = true;
			leaderTimeout = window.setTimeout(() => {
				leaderPressed = false;
				if (leaderTimeout) clearTimeout(leaderTimeout);
			}, 3000);
			return;
		}

		// Leader shortcuts
		if (leaderPressed) {
			event.preventDefault();
			if (event.key === '/') {
				openSearch();
				return;
			}
			if (event.key === 'h') {
				window.location.href = '/';
				closeAll();
				return;
			}
			if (event.key === 'b') {
				closeAll();
				return;
			}
			if (event.key === 'Escape') {
				closeAll();
				return;
			}
			return;
		}

		switch (event.key) {
			case 'j':
			case 'ArrowDown':
				event.preventDefault();
				selectPost(selectedIndex + 1);
				break;
			case 'k':
			case 'ArrowUp':
				event.preventDefault();
				selectPost(selectedIndex - 1);
				break;
			case 'Enter':
				event.preventDefault();
				openPost();
				break;
			case 'G':
				event.preventDefault();
				selectPost(maxIndex);
				break;
			case '?':
				event.preventDefault();
				showHelp = !showHelp;
				break;
			case 'Escape':
				showHelp = false;
				leaderPressed = false;
				selectedIndex = -1;
				postElements.forEach(el => el.classList.remove('vim-selected'));
				break;
			case 'Tab':
				event.preventDefault();
				if (event.shiftKey) {
					selectPost(selectedIndex - 1);
				} else {
					selectPost(selectedIndex + 1);
				}
				break;
			default:
				if (/^[1-9]$/.test(event.key)) {
					event.preventDefault();
					selectPost(parseInt(event.key) - 1);
				}
		}
	}

	let gPressed = false;
	let gTimeout: number | null = null;

	function handleGKey(event: KeyboardEvent) {
		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
			return;
		}

		if (event.key === 'g' && !gPressed) {
			gPressed = true;
			gTimeout = window.setTimeout(() => {
				gPressed = false;
			}, 500);
		} else if (event.key === 'g' && gPressed) {
			event.preventDefault();
			selectPost(0);
			gPressed = false;
			if (gTimeout) clearTimeout(gTimeout);
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeydown);
			window.addEventListener('keydown', handleGKey);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('keydown', handleGKey);
			if (gTimeout) clearTimeout(gTimeout);
			if (leaderTimeout) clearTimeout(leaderTimeout);
		}
	});
</script>

{#if showSearch}
	<div class="search-backdrop" onclick={closeAll} role="presentation">
		<div class="search-palette" role="dialog" aria-label="Search posts">
			<div class="search-container">
				<span class="search-prompt">&gt;</span>
				<input
					bind:this={inputElement}
					bind:value={searchQuery}
					type="text"
					placeholder="Search posts..."
					class="search-input"
				/>
				<kbd class="search-hint">esc</kbd>
			</div>
			<div class="search-results">
				{#each filteredPosts as post, i}
					<button
						class="search-result"
						class:selected={i === searchSelectedIndex}
						onclick={() => { window.location.href = `/blog/${post.slug}`; }}
						onmouseenter={() => searchSelectedIndex = i}
					>
						<div class="result-content">
							<span class="result-title">{@html highlightMatch(post.title, searchQuery)}</span>
							<span class="result-desc">{@html highlightMatch(post.description, searchQuery)}</span>
						</div>
					</button>
				{/each}
				{#if filteredPosts.length === 0}
					<div class="no-results">No posts found</div>
				{/if}
			</div>
			<div class="search-footer">
				<span><kbd>↑↓</kbd> navigate</span>
				<span><kbd>↵</kbd> open</span>
			</div>
		</div>
	</div>
{:else if leaderPressed}
	<WhichKey groups={leaderGroups} show={true} onclose={() => { leaderPressed = false; }} />
{:else}
	<WhichKey groups={keyGroups} bind:show={showHelp} onclose={() => showHelp = false} />
{/if}

<style>
	:global(.timeline-item.vim-selected) {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.search-backdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 15vh;
		z-index: 1000;
	}

	.search-palette {
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

	.search-prompt {
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

	.search-hint {
		font-size: 0.65rem;
		padding: 0.15rem 0.3rem;
		background-color: var(--surface0);
		color: var(--subtext);
		border-radius: 3px;
	}

	.search-results {
		max-height: 250px;
		overflow-y: auto;
	}

	.search-result {
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

	.search-result.selected {
		background-color: var(--surface0);
	}

	.result-content {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		text-align: left;
	}

	.result-title {
		color: var(--text);
	}

	.result-desc {
		color: var(--subtext);
		font-size: 0.75rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.result-title :global(mark),
	.result-desc :global(mark) {
		background-color: var(--accent);
		color: var(--crust);
		border-radius: 2px;
		padding: 0 2px;
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
