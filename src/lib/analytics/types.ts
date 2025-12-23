/**
 * Analytics Plugin Interface (Strategy Pattern)
 * Each analytics provider implements this interface
 */
export interface AnalyticsPlugin {
	name: string;
	init(): void;
	track(eventName: string, properties?: Record<string, unknown>): void;
	identify?(userId: string, traits?: Record<string, unknown>): void;
}

/**
 * Event types for type safety
 */
export const EventTypes = {
	// Navigation
	NAVIGATE: 'navigate',
	SECTION_VIEW: 'section_view',

	// Theme
	THEME_CHANGE: 'theme_change',

	// Command Palette
	PALETTE_OPEN: 'palette_open',
	PALETTE_COMMAND: 'palette_command',

	// Social
	SOCIAL_CLICK: 'social_click',

	// Blog
	BLOG_VIEW: 'blog_view',
	BLOG_SELECT: 'blog_select',

	// External
	EXTERNAL_CLICK: 'external_click',

	// Keyboard
	SHORTCUT_USE: 'shortcut_use'
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];

/**
 * Event properties interfaces for type safety
 */
export interface NavigateProperties {
	section: string;
	method: 'click' | 'keyboard' | 'scroll';
}

export interface ThemeChangeProperties {
	theme: string;
	source?: string;
}

export interface SocialClickProperties {
	platform: 'github' | 'linkedin' | 'email';
	source?: string;
}

export interface BlogProperties {
	slug: string;
	title?: string;
}

export interface ExternalClickProperties {
	type: 'tool' | 'tech' | 'repo';
	name: string;
	url: string;
}

export interface ShortcutProperties {
	key: string;
	action: string;
}
