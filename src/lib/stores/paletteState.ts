/**
 * State machine for CommandPalette modes
 * Manages the different states of the command palette
 */

import { writable, derived } from 'svelte/store';

export type PaletteMode = 'idle' | 'leader' | 'help' | 'search' | 'goto';

interface PaletteState {
	mode: PaletteMode;
	leaderTimeout?: number;
	gotoTimeout?: number;
}

const state = writable<PaletteState>({
	mode: 'idle'
});

function clearTimeouts(currentState: PaletteState) {
	if (currentState.leaderTimeout) {
		clearTimeout(currentState.leaderTimeout);
	}
	if (currentState.gotoTimeout) {
		clearTimeout(currentState.gotoTimeout);
	}
}

export const paletteState = {
	subscribe: state.subscribe,

	enterLeader() {
		state.update((s) => {
			clearTimeouts(s);
			return {
				mode: 'leader',
				leaderTimeout: setTimeout(() => {
					this.reset();
				}, 3000) as unknown as number
			};
		});
	},

	enterHelp() {
		state.update((s) => {
			clearTimeouts(s);
			return {
				mode: 'help',
				leaderTimeout: setTimeout(() => {
					this.reset();
				}, 5000) as unknown as number
			};
		});
	},

	enterSearch() {
		state.update((s) => {
			clearTimeouts(s);
			return { mode: 'search' };
		});
	},

	enterGoto() {
		state.update((s) => {
			clearTimeouts(s);
			return {
				mode: 'goto',
				gotoTimeout: setTimeout(() => {
					this.reset();
				}, 2000) as unknown as number
			};
		});
	},

	reset() {
		state.update((s) => {
			clearTimeouts(s);
			return { mode: 'idle' };
		});
	}
};

// Export derived stores for convenience
export const mode = derived(state, ($state) => $state.mode);
export const isIdle = derived(state, ($state) => $state.mode === 'idle');
export const isLeader = derived(state, ($state) => $state.mode === 'leader');
export const isHelp = derived(state, ($state) => $state.mode === 'help');
export const isSearch = derived(state, ($state) => $state.mode === 'search');
export const isGoto = derived(state, ($state) => $state.mode === 'goto');
