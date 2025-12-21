<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import WhichKey from './WhichKey.svelte';

	let showHelp = $state(false);
	let leaderPressed = $state(false);
	let leaderTimeout: number | null = null;

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
			title: 'Space +',
			keys: [
				{ key: 'b', label: 'Blog' },
				{ key: 'h', label: 'Home' }
			]
		}
	];

	function closeAll() {
		showHelp = false;
		leaderPressed = false;
		if (leaderTimeout) clearTimeout(leaderTimeout);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
			return;
		}

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
				window.location.href = '/blog';
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

<WhichKey groups={keyGroups} bind:show={showHelp} onclose={() => showHelp = false} />
