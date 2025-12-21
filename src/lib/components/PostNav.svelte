<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import WhichKey from './WhichKey.svelte';
	import { theme } from '$lib/stores/theme';

	let { prevPost = null, nextPost = null }: { prevPost: { slug: string } | null; nextPost: { slug: string } | null } = $props();

	let showHelp = $state(false);
	let leaderPressed = $state(false);
	let leaderTimeout: number | null = null;
	let showSearch = $state(false);
	let searchQuery = $state('');
	let inputElement: HTMLInputElement;
	let matchCount = $state(0);
	let currentMatch = $state(0);

	const keyGroups = [
		{
			title: 'Scroll',
			keys: [
				{ key: 'j ↓', label: 'Down' },
				{ key: 'k ↑', label: 'Up' },
				{ key: 'gg', label: 'Top' },
				{ key: 'G', label: 'Bottom' },
				{ key: '^d', label: 'Half ↓' },
				{ key: '^u', label: 'Half ↑' }
			]
		},
		{
			title: 'Navigate',
			keys: [
				{ key: '/', label: 'Search' },
				{ key: '[', label: 'Prev post' },
				{ key: ']', label: 'Next post' }
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
		},
		{
			title: 'Theme',
			keys: [
				{ key: '1', label: 'Frappé' },
				{ key: '2', label: 'Macchiato' },
				{ key: '3', label: 'Mocha' }
			]
		}
	];

	function closeAll() {
		showHelp = false;
		leaderPressed = false;
		showSearch = false;
		clearHighlights();
		if (leaderTimeout) clearTimeout(leaderTimeout);
	}

	function openSearch() {
		showSearch = true;
		searchQuery = '';
		matchCount = 0;
		currentMatch = 0;
		leaderPressed = false;
		setTimeout(() => inputElement?.focus(), 10);
	}

	function clearHighlights() {
		document.querySelectorAll('.search-highlight').forEach(el => {
			const parent = el.parentNode;
			if (parent) {
				parent.replaceChild(document.createTextNode(el.textContent || ''), el);
				parent.normalize();
			}
		});
	}

	function highlightMatches() {
		clearHighlights();
		if (!searchQuery.trim()) {
			matchCount = 0;
			currentMatch = 0;
			return;
		}

		const content = document.querySelector('.post-content');
		if (!content) return;

		const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null);
		const matches: { node: Text; index: number }[] = [];
		const query = searchQuery.toLowerCase();

		let node;
		while ((node = walker.nextNode())) {
			const text = node.textContent || '';
			let index = text.toLowerCase().indexOf(query);
			while (index !== -1) {
				matches.push({ node: node as Text, index });
				index = text.toLowerCase().indexOf(query, index + 1);
			}
		}

		matchCount = matches.length;
		if (matchCount === 0) {
			currentMatch = 0;
			return;
		}

		// Highlight all matches
		for (let i = matches.length - 1; i >= 0; i--) {
			const { node, index } = matches[i];
			const text = node.textContent || '';
			const before = text.slice(0, index);
			const match = text.slice(index, index + query.length);
			const after = text.slice(index + query.length);

			const span = document.createElement('span');
			span.className = 'search-highlight';
			span.textContent = match;

			const parent = node.parentNode;
			if (parent) {
				const frag = document.createDocumentFragment();
				if (before) frag.appendChild(document.createTextNode(before));
				frag.appendChild(span);
				if (after) frag.appendChild(document.createTextNode(after));
				parent.replaceChild(frag, node);
			}
		}

		currentMatch = 1;
		scrollToMatch(0);
	}

	function scrollToMatch(index: number) {
		const highlights = document.querySelectorAll('.search-highlight');
		highlights.forEach((el, i) => {
			el.classList.toggle('current', i === index);
		});
		highlights[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	function nextMatch() {
		if (matchCount === 0) return;
		currentMatch = currentMatch >= matchCount ? 1 : currentMatch + 1;
		scrollToMatch(currentMatch - 1);
	}

	function prevMatch() {
		if (matchCount === 0) return;
		currentMatch = currentMatch <= 1 ? matchCount : currentMatch - 1;
		scrollToMatch(currentMatch - 1);
	}

	function handleKeydown(event: KeyboardEvent) {
		// Search mode - handle specially for input
		if (showSearch && event.target instanceof HTMLInputElement) {
			if (event.key === 'Escape') {
				event.preventDefault();
				closeAll();
				return;
			}
			if (event.key === 'Enter') {
				event.preventDefault();
				if (event.shiftKey) {
					prevMatch();
				} else {
					nextMatch();
				}
				return;
			}
			return;
		}

		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
			return;
		}

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
				window.location.href = '/blog';
				closeAll();
				return;
			}
			if (event.key === '1') {
				theme.set('frappe');
				closeAll();
				return;
			}
			if (event.key === '2') {
				theme.set('macchiato');
				closeAll();
				return;
			}
			if (event.key === '3') {
				theme.set('mocha');
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
			case '/':
				event.preventDefault();
				openSearch();
				break;
			case '[':
				event.preventDefault();
				if (prevPost) window.location.href = `/blog/${prevPost.slug}`;
				break;
			case ']':
				event.preventDefault();
				if (nextPost) window.location.href = `/blog/${nextPost.slug}`;
				break;
			case 'j':
			case 'ArrowDown':
				event.preventDefault();
				window.scrollBy({ top: 100, behavior: 'smooth' });
				break;
			case 'k':
			case 'ArrowUp':
				event.preventDefault();
				window.scrollBy({ top: -100, behavior: 'smooth' });
				break;
			case 'G':
				event.preventDefault();
				window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
				break;
			case 'd':
				if (event.ctrlKey) {
					event.preventDefault();
					window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
				}
				break;
			case 'u':
				if (event.ctrlKey) {
					event.preventDefault();
					window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' });
				}
				break;
			case '?':
				event.preventDefault();
				showHelp = !showHelp;
				break;
			case 'Escape':
				closeAll();
				break;
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
			window.scrollTo({ top: 0, behavior: 'smooth' });
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
	<div class="page-search">
		<input
			bind:this={inputElement}
			bind:value={searchQuery}
			oninput={highlightMatches}
			type="text"
			placeholder="Search in page..."
			class="search-input"
		/>
		{#if matchCount > 0}
			<span class="match-count">{currentMatch}/{matchCount}</span>
		{/if}
		<div class="search-nav">
			<button onclick={prevMatch} disabled={matchCount === 0} aria-label="Previous">↑</button>
			<button onclick={nextMatch} disabled={matchCount === 0} aria-label="Next">↓</button>
		</div>
		<button class="close-btn" onclick={closeAll} aria-label="Close">×</button>
	</div>
{:else if leaderPressed}
	<WhichKey groups={leaderGroups} show={true} onclose={() => { leaderPressed = false; }} />
{:else}
	<WhichKey groups={keyGroups} bind:show={showHelp} onclose={() => showHelp = false} />
{/if}

<style>
	.page-search {
		position: fixed;
		top: 1rem;
		right: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--mantle);
		border: 1px solid var(--surface0);
		border-radius: 8px;
		padding: 0.5rem 0.75rem;
		z-index: 1000;
	}

	.search-input {
		background: transparent;
		border: none;
		color: var(--text);
		font-family: 'Fira Code', monospace;
		font-size: 0.85rem;
		outline: none;
		width: 150px;
	}

	.search-input::placeholder {
		color: var(--subtext);
	}

	.match-count {
		color: var(--subtext);
		font-size: 0.75rem;
	}

	.search-nav {
		display: flex;
		gap: 0.25rem;
	}

	.search-nav button,
	.close-btn {
		background: var(--surface0);
		border: none;
		color: var(--text);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.8rem;
	}

	.search-nav button:hover,
	.close-btn:hover {
		background: var(--surface1);
	}

	.search-nav button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.search-highlight) {
		background-color: var(--yellow);
		color: var(--crust);
		border-radius: 2px;
		padding: 0 2px;
	}

	:global(.search-highlight.current) {
		background-color: var(--accent);
	}
</style>
