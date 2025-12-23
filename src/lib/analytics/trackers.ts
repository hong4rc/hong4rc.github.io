import { analytics } from './AnalyticsManager';
import type {
	NavigateProperties,
	ThemeChangeProperties,
	SocialClickProperties,
	BlogProperties,
	ExternalClickProperties,
	ShortcutProperties
} from './types';

/**
 * Facade Pattern - Simplified tracking API
 * These functions provide a clean interface to track specific events
 */

export const tracker = {
	// Navigation
	navigate(section: string, method: 'click' | 'keyboard' | 'scroll' = 'click') {
		analytics.track('navigate', { section, method } satisfies NavigateProperties);
	},

	// Theme
	themeChange(theme: string, source?: string) {
		analytics.track('theme_change', { theme, source } satisfies ThemeChangeProperties);
	},

	// Command Palette
	paletteOpen(mode: string) {
		analytics.track('palette_open', { mode });
	},

	paletteCommand(command: string, label?: string) {
		analytics.track('palette_command', { command, label });
	},

	// Social
	social(platform: 'github' | 'linkedin' | 'email', source?: string) {
		analytics.track('social_click', {
			platform,
			source
		} satisfies SocialClickProperties);
	},

	// Blog
	blogView(slug: string, title?: string) {
		analytics.track('blog_view', { slug, title } satisfies BlogProperties);
	},

	blogSelect(slug: string, title?: string) {
		analytics.track('blog_select', { slug, title } satisfies BlogProperties);
	},

	// External links
	externalLink(type: 'tool' | 'tech' | 'repo', name: string, url: string) {
		analytics.track('external_click', {
			type,
			name,
			url
		} satisfies ExternalClickProperties);
	},

	// Keyboard shortcuts
	shortcut(key: string, action: string) {
		analytics.track('shortcut_use', { key, action } satisfies ShortcutProperties);
	}
};
