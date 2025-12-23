import { browser, dev } from '$app/environment';
import { config } from '$lib/config';

// Event categories
export const AnalyticsCategory = {
	NAVIGATION: 'Navigation',
	THEME: 'Theme',
	COMMAND_PALETTE: 'Command Palette',
	SOCIAL: 'Social',
	BLOG: 'Blog',
	EXTERNAL_LINK: 'External Link',
	KEYBOARD: 'Keyboard Shortcut'
} as const;

// Event actions
export const AnalyticsAction = {
	// Navigation
	SCROLL_TO_SECTION: 'scroll_to_section',
	PAGE_NAVIGATION: 'page_navigation',
	SECTION_VIEW: 'section_view',

	// Theme
	THEME_CHANGE: 'theme_change',

	// Command Palette
	PALETTE_OPEN: 'palette_open',
	PALETTE_SEARCH: 'palette_search',
	PALETTE_COMMAND: 'palette_command',

	// Social
	GITHUB_CLICK: 'github_click',
	LINKEDIN_CLICK: 'linkedin_click',
	EMAIL_CLICK: 'email_click',

	// Blog
	BLOG_POST_VIEW: 'blog_post_view',
	BLOG_POST_SELECT: 'blog_post_select',
	BLOG_NAVIGATION: 'blog_navigation',

	// External Links
	TOOL_CLICK: 'tool_click',
	TECH_STACK_CLICK: 'tech_stack_click',
	REPO_CLICK: 'repo_click',

	// Keyboard
	KEYBOARD_SHORTCUT: 'keyboard_shortcut'
} as const;

interface AnalyticsEvent {
	category: string;
	action: string;
	label?: string;
	value?: number;
	[key: string]: unknown;
}

/**
 * Track a custom event to Google Analytics
 */
export function trackEvent({ category, action, label, value, ...params }: AnalyticsEvent) {
	if (!browser || dev || !config.features.enableAnalytics) return;

	try {
		if (typeof window.gtag === 'function') {
			window.gtag('event', action, {
				event_category: category,
				event_label: label,
				value: value,
				...params
			});
		}
	} catch (error) {
		console.error('Analytics tracking error:', error);
	}
}

// Convenience functions for common events

export function trackNavigation(section: string, method: 'click' | 'keyboard' | 'scroll' = 'click') {
	trackEvent({
		category: AnalyticsCategory.NAVIGATION,
		action: AnalyticsAction.SCROLL_TO_SECTION,
		label: section,
		method
	});
}

export function trackThemeChange(theme: string) {
	trackEvent({
		category: AnalyticsCategory.THEME,
		action: AnalyticsAction.THEME_CHANGE,
		label: theme
	});
}

export function trackCommandPalette(action: 'open' | 'search' | 'command', label?: string) {
	const actionMap = {
		open: AnalyticsAction.PALETTE_OPEN,
		search: AnalyticsAction.PALETTE_SEARCH,
		command: AnalyticsAction.PALETTE_COMMAND
	};

	trackEvent({
		category: AnalyticsCategory.COMMAND_PALETTE,
		action: actionMap[action],
		label
	});
}

export function trackSocialClick(platform: 'github' | 'linkedin' | 'email', source?: string) {
	const actionMap = {
		github: AnalyticsAction.GITHUB_CLICK,
		linkedin: AnalyticsAction.LINKEDIN_CLICK,
		email: AnalyticsAction.EMAIL_CLICK
	};

	trackEvent({
		category: AnalyticsCategory.SOCIAL,
		action: actionMap[platform],
		label: source
	});
}

export function trackBlogPost(action: 'view' | 'select', slug: string, title?: string) {
	trackEvent({
		category: AnalyticsCategory.BLOG,
		action: action === 'view' ? AnalyticsAction.BLOG_POST_VIEW : AnalyticsAction.BLOG_POST_SELECT,
		label: slug,
		title
	});
}

export function trackExternalLink(type: 'tool' | 'tech' | 'repo', name: string, url: string) {
	const actionMap = {
		tool: AnalyticsAction.TOOL_CLICK,
		tech: AnalyticsAction.TECH_STACK_CLICK,
		repo: AnalyticsAction.REPO_CLICK
	};

	trackEvent({
		category: AnalyticsCategory.EXTERNAL_LINK,
		action: actionMap[type],
		label: name,
		url
	});
}

export function trackKeyboardShortcut(key: string, action: string) {
	trackEvent({
		category: AnalyticsCategory.KEYBOARD,
		action: AnalyticsAction.KEYBOARD_SHORTCUT,
		label: `${key}: ${action}`
	});
}
