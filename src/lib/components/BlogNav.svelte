<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import WhichKey from './WhichKey.svelte';

	let { posts = [] }: { posts: { slug: string }[] } = $props();

	let selectedIndex = $state(-1);
	let showHelp = $state(false);
	let leaderPressed = $state(false);
	let leaderTimeout: number | null = null;

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
				{ key: 'Esc', label: 'Clear' }
			]
		},
		{
			title: 'Space +',
			keys: [
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
		if (leaderTimeout) clearTimeout(leaderTimeout);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
			return;
		}

		const postElements = getPostElements();
		const maxIndex = postElements.length - 1;

		// Leader key (Space)
		if (event.code === 'Space' && !event.metaKey && !event.ctrlKey && !event.altKey) {
			event.preventDefault();
			leaderPressed = true;
			showHelp = true;
			leaderTimeout = window.setTimeout(() => {
				closeAll();
			}, 3000);
			return;
		}

		// Leader shortcuts
		if (leaderPressed && showHelp) {
			event.preventDefault();
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

<WhichKey groups={keyGroups} bind:show={showHelp} onclose={() => showHelp = false} />

<style>
	:global(.timeline-item.vim-selected) {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}
</style>
