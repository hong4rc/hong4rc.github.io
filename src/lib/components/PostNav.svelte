<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import WhichKey from './WhichKey.svelte';

	let showHelp = $state(false);

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
				{ key: 'b', label: 'Blog' },
				{ key: 'h', label: 'Home' }
			]
		}
	];

	function handleKeydown(event: KeyboardEvent) {
		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
			return;
		}

		switch (event.key) {
			case 'h':
				event.preventDefault();
				window.location.href = '/';
				break;
			case 'b':
				event.preventDefault();
				window.location.href = '/blog';
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
				showHelp = false;
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
		}
	});
</script>

<WhichKey groups={keyGroups} bind:show={showHelp} onclose={() => showHelp = false} />
