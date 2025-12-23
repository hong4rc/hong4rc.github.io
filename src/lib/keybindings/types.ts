/**
 * Types for keybinding commands
 */

import type { PaletteMode } from '$lib/stores/paletteState';

export interface KeyCommand {
	key: string;
	ctrl?: boolean;
	shift?: boolean;
	alt?: boolean;
	meta?: boolean;
	description: string;
	category?: string;
	/** Modes where this command is active */
	activeModes: PaletteMode[];
	/** Execute the command */
	execute: () => void;
}

export interface KeyBinding {
	key: string;
	label: string;
	action: () => void;
}

export interface NavigationCommands {
	goToNextPage: () => void;
	goToPrevPage: () => void;
	goToTop: () => void;
	goToBottom: () => void;
	halfPageDown: () => void;
	halfPageUp: () => void;
	fullPageDown: () => void;
	fullPageUp: () => void;
	centerCurrentPage: () => void;
	scrollTo: (className: string) => void;
}
