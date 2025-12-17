import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { type Theme, defaultTheme } from '$lib/config';

const STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
	if (!browser) return defaultTheme;

	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored && ['latte', 'frappe', 'macchiato', 'mocha'].includes(stored)) {
		return stored as Theme;
	}
	return defaultTheme;
}

function createThemeStore() {
	const { subscribe, set } = writable<Theme>(getInitialTheme());

	return {
		subscribe,
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem(STORAGE_KEY, theme);
				document.documentElement.setAttribute('data-theme', theme);
			}
			set(theme);
		},
		init: () => {
			if (browser) {
				const theme = getInitialTheme();
				document.documentElement.setAttribute('data-theme', theme);
				set(theme);
			}
		}
	};
}

export const theme = createThemeStore();
