/**
 * Keybinding command registry
 * Organizes all keyboard commands by category
 */

import type { KeyCommand } from './types';
import * as nav from './navigation';
import { paletteState } from '$lib/stores/paletteState';

export function createNavigationCommands(): KeyCommand[] {
	return [
		{
			key: 'j',
			description: 'Next page',
			category: 'Navigation',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToNextPage();
			}
		},
		{
			key: 'k',
			description: 'Previous page',
			category: 'Navigation',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToPrevPage();
			}
		},
		{
			key: 'w',
			description: 'Next page (alternative)',
			category: 'Navigation',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToNextPage();
			}
		},
		{
			key: 'b',
			description: 'Previous page (alternative)',
			category: 'Navigation',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToPrevPage();
			}
		},
		{
			key: 'G',
			description: 'Go to bottom',
			category: 'Navigation',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToBottom();
			}
		},
		{
			key: '0',
			description: 'Go to first section',
			category: 'Navigation',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToTop();
			}
		},
		{
			key: '^',
			description: 'Go to first section',
			category: 'Navigation',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToTop();
			}
		},
		{
			key: '$',
			description: 'Go to last section',
			category: 'Navigation',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToBottom();
			}
		},
		{
			key: 'ArrowDown',
			description: 'Next page',
			category: 'Navigation',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToNextPage();
			}
		},
		{
			key: 'ArrowUp',
			description: 'Previous page',
			category: 'Navigation',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToPrevPage();
			}
		}
	];
}

export function createScrollCommands(): KeyCommand[] {
	return [
		{
			key: 'd',
			ctrl: true,
			description: 'Half page down',
			category: 'Scroll',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.halfPageDown();
			}
		},
		{
			key: 'u',
			ctrl: true,
			description: 'Half page up',
			category: 'Scroll',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.halfPageUp();
			}
		},
		{
			key: 'f',
			ctrl: true,
			description: 'Full page down',
			category: 'Scroll',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.fullPageDown();
			}
		},
		{
			key: 'b',
			ctrl: true,
			description: 'Full page up',
			category: 'Scroll',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.fullPageUp();
			}
		},
		{
			key: 'Tab',
			description: 'Next section',
			category: 'Scroll',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToNextPage();
			}
		},
		{
			key: 'Tab',
			shift: true,
			description: 'Previous section',
			category: 'Scroll',
			activeModes: ['idle', 'help'],
			execute: () => {
				paletteState.reset();
				nav.goToPrevPage();
			}
		}
	];
}

export function getAllCommands(): KeyCommand[] {
	return [...createNavigationCommands(), ...createScrollCommands()];
}
