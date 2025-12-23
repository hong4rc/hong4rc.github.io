<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { paletteState, mode, isIdle, isLeader, isHelp, isSearch, isGoto } from '$lib/stores/paletteState';
	import { getAllCommands } from '$lib/keybindings/commands';
	import { config, themes } from '$lib/config';
	import { theme } from '$lib/stores/theme';
	import { addUTM } from '$lib/utils/utm';
	import * as nav from '$lib/keybindings/navigation';
	import { tracker } from '$lib/analytics';
	import LeaderMenu from './palette/LeaderMenu.svelte';
	import HelpMenu from './palette/HelpMenu.svelte';
	import SearchPalette from './palette/SearchPalette.svelte';
	import GoToMenu from './palette/GoToMenu.svelte';

	let gPressed = $state(false);
	let gTimeout: number | null = null;

	const commands = getAllCommands();

	function handleKeydown(event: KeyboardEvent) {
		// Ignore if typing in inputs
		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
			return;
		}

		const currentMode = $mode;

		// Search mode - delegate to SearchPalette component
		if (currentMode === 'search') {
			if (event.key === 'Escape') {
				event.preventDefault();
				paletteState.reset();
			}
			return;
		}

		// Escape - close any open menu
		if (event.key === 'Escape' && currentMode !== 'idle') {
			event.preventDefault();
			paletteState.reset();
			return;
		}

		// / - open search
		if (event.key === '/' && currentMode === 'idle' && !gPressed) {
			event.preventDefault();
			tracker.paletteOpen('search');
			paletteState.enterSearch();
			return;
		}

		// ? - show help
		if (event.key === '?' && !gPressed) {
			event.preventDefault();
			if (currentMode === 'leader') {
				paletteState.reset();
			}
			tracker.paletteOpen('help');
			paletteState.enterHelp();
			return;
		}

		// Help mode - handle special keys
		if (currentMode === 'help') {
			// Ignore modifier keys
			if (['Shift', 'Alt', 'Control', 'Meta'].includes(event.key)) {
				return;
			}

			// / - open search from help
			if (event.key === '/') {
				event.preventDefault();
				paletteState.enterSearch();
				return;
			}

			// Space - open leader menu from help
			if (event.code === 'Space') {
				event.preventDefault();
				paletteState.enterLeader();
				return;
			}

			// g - enter goto mode from help
			if (event.key === 'g') {
				event.preventDefault();
				if (gPressed) {
					// gg - go to top
					if (gTimeout) clearTimeout(gTimeout);
					nav.goToTop();
					gPressed = false;
					paletteState.reset();
					return;
				}

				gPressed = true;
				paletteState.enterGoto();

				gTimeout = setTimeout(() => {
					gPressed = false;
					paletteState.reset();
				}, 2000) as unknown as number;
				return;
			}

			// ? - toggle help (close)
			if (event.key === '?') {
				event.preventDefault();
				paletteState.reset();
				return;
			}

			// Any other key will close help and continue processing
			paletteState.reset();
			// Continue to process the key below
		}

		// Space - leader mode
		if (event.code === 'Space' && !event.metaKey && !event.ctrlKey && !event.altKey) {
			event.preventDefault();

			// Toggle from help to leader
			if (currentMode === 'help') {
				paletteState.reset();
			}

			// Double Space - open search
			if (currentMode === 'leader') {
				tracker.paletteOpen('search_from_leader');
				paletteState.enterSearch();
				return;
			}

			tracker.paletteOpen('leader');
			paletteState.enterLeader();
			return;
		}

		// g key - enter go-to mode
		if (event.key === 'g' && currentMode === 'idle') {
			event.preventDefault();

			if (gPressed) {
				// gg - go to top
				if (gTimeout) clearTimeout(gTimeout);
				nav.goToTop();
				gPressed = false;
				paletteState.reset();
				return;
			}

			gPressed = true;
			tracker.paletteOpen('goto');
			paletteState.enterGoto();

			gTimeout = setTimeout(() => {
				gPressed = false;
				paletteState.reset();
			}, 2000) as unknown as number;
			return;
		}

		// g + key - go to page
		if (gPressed && currentMode === 'goto') {
			// Ignore modifier keys
			if (['Shift', 'Alt', 'Control', 'Meta'].includes(event.key)) {
				return;
			}

			event.preventDefault();

			// Execute goto commands
			if (event.key === 'h') {
				tracker.shortcut('g+h', 'goto_hero');
				tracker.navigate('hero', 'keyboard');
				nav.scrollTo('page-hero');
			} else if (event.key === 'e') {
				tracker.shortcut('g+e', 'goto_experience');
				tracker.navigate('experience', 'keyboard');
				nav.scrollTo('page-experience');
			} else if (event.key === 't') {
				tracker.shortcut('g+t', 'goto_tech');
				tracker.navigate('tech', 'keyboard');
				nav.scrollTo('page-tech');
			} else if (event.key === 'l') {
				tracker.shortcut('g+l', 'goto_tools');
				tracker.navigate('tools', 'keyboard');
				nav.scrollTo('page-tools');
			} else if (event.key === 'c') {
				tracker.shortcut('g+c', 'goto_contact');
				tracker.navigate('contact', 'keyboard');
				nav.scrollTo('page-contact');
			} else if (event.key === 'b') {
				tracker.shortcut('g+b', 'goto_blog');
				window.location.href = '/blog';
			}

			// Close goto menu
			gPressed = false;
			if (gTimeout) clearTimeout(gTimeout);
			paletteState.reset();
			return;
		}

		// Leader shortcuts (when in leader mode)
		if (currentMode === 'leader') {
			// Ignore modifier keys
			if (['Shift', 'Alt', 'Control', 'Meta'].includes(event.key)) {
				return;
			}

			event.preventDefault();

			// Execute leader commands
			if (event.key === 'h') {
				tracker.shortcut('Space+h', 'leader_goto_hero');
				tracker.navigate('hero', 'keyboard');
				nav.scrollTo('page-hero');
				paletteState.reset();
			} else if (event.key === 'e') {
				tracker.shortcut('Space+e', 'leader_goto_experience');
				tracker.navigate('experience', 'keyboard');
				nav.scrollTo('page-experience');
				paletteState.reset();
			} else if (event.key === 't') {
				tracker.shortcut('Space+t', 'leader_goto_tech');
				tracker.navigate('tech', 'keyboard');
				nav.scrollTo('page-tech');
				paletteState.reset();
			} else if (event.key === 'l') {
				tracker.shortcut('Space+l', 'leader_goto_tools');
				tracker.navigate('tools', 'keyboard');
				nav.scrollTo('page-tools');
				paletteState.reset();
			} else if (event.key === 'c') {
				tracker.shortcut('Space+c', 'leader_goto_contact');
				tracker.navigate('contact', 'keyboard');
				nav.scrollTo('page-contact');
				paletteState.reset();
			} else if (event.key === 'b') {
				tracker.shortcut('Space+b', 'leader_goto_blog');
				window.location.href = '/blog';
				paletteState.reset();
			} else if (event.key === '1') {
				tracker.shortcut('Space+1', 'theme_latte');
				theme.set('latte');
				paletteState.reset();
			} else if (event.key === '2') {
				tracker.shortcut('Space+2', 'theme_frappe');
				theme.set('frappe');
				paletteState.reset();
			} else if (event.key === '3') {
				tracker.shortcut('Space+3', 'theme_macchiato');
				theme.set('macchiato');
				paletteState.reset();
			} else if (event.key === '4') {
				tracker.shortcut('Space+4', 'theme_mocha');
				theme.set('mocha');
				paletteState.reset();
			} else if (event.key === 'G') {
				tracker.shortcut('Space+G', 'open_github');
				tracker.social('github', 'command_palette');
				const githubUrl = addUTM(config.contact.github, { content: 'command_palette_github' });
				window.open(githubUrl, '_blank');
				paletteState.reset();
			} else if (event.key === 'L') {
				tracker.shortcut('Space+L', 'open_linkedin');
				tracker.social('linkedin', 'command_palette');
				const linkedinUrl = addUTM(config.contact.linkedin, { content: 'command_palette_linkedin' });
				window.open(linkedinUrl, '_blank');
				paletteState.reset();
			} else if (event.key === 'E') {
				tracker.shortcut('Space+E', 'send_email');
				tracker.social('email', 'command_palette');
				window.location.href = `mailto:${config.contact.email}?subject=Contact from Portfolio (Command Palette)`;
				paletteState.reset();
			} else {
				// Key doesn't match any command, close the menu
				paletteState.reset();
			}
			return;
		}

		// Execute registered commands
		const matchedCommand = commands.find((cmd) => {
			if (cmd.key !== event.key) return false;
			if (cmd.ctrl && !event.ctrlKey) return false;
			if (cmd.shift && !event.shiftKey) return false;
			if (cmd.alt && !event.altKey) return false;
			if (cmd.meta && !event.metaKey) return false;
			return cmd.activeModes.includes(currentMode);
		});

		if (matchedCommand) {
			event.preventDefault();
			matchedCommand.execute();
			return;
		}
	}

	function handleCommandExecute(command: any) {
		command.action();
		paletteState.reset();
	}

	function handleGotoCommand(page: any) {
		page.action();
		gPressed = false;
		if (gTimeout) clearTimeout(gTimeout);
		paletteState.reset();
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeydown);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeydown);
			if (gTimeout) clearTimeout(gTimeout);
		}
	});
</script>

{#if $isGoto}
	<GoToMenu onCommand={handleGotoCommand} />
{/if}

{#if $isLeader}
	<LeaderMenu onCommand={handleCommandExecute} />
{/if}

{#if $isHelp}
	<HelpMenu />
{/if}

{#if $isSearch}
	<SearchPalette onCommand={handleCommandExecute} onClose={() => paletteState.reset()} />
{/if}

{#if $isIdle}
	<aside class="trigger" aria-label="Keyboard shortcut hint">
		<kbd>SPC</kbd>
	</aside>
{/if}

<style>
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
</style>
