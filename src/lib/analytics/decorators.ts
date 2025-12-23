import { analytics } from './AnalyticsManager';
import type { EventType } from './types';

/**
 * Decorator Pattern - Wraps event handlers with analytics tracking
 */

/**
 * Track click events automatically
 * Usage: onclick={track('button_click', { button: 'submit' })(handleClick)}
 */
export function track(
	eventName: EventType | string,
	properties?: Record<string, unknown>
) {
	return <T extends (...args: any[]) => any>(handler?: T) => {
		return ((...args: Parameters<T>) => {
			// Track the event
			analytics.track(eventName, properties);

			// Call original handler if provided
			if (handler) {
				return handler(...args);
			}
		}) as T;
	};
}

/**
 * Higher-order function for tracking navigation
 */
export function trackNavigation(section: string, method: 'click' | 'keyboard' = 'click') {
	return <T extends (...args: any[]) => any>(handler?: T) => {
		return track('navigate', { section, method })(handler);
	};
}

/**
 * Track external link clicks
 */
export function trackExternalLink(
	type: 'tool' | 'tech' | 'repo',
	name: string,
	url: string
) {
	return () => {
		analytics.track('external_click', { type, name, url });
	};
}

/**
 * Track social clicks
 */
export function trackSocial(
	platform: 'github' | 'linkedin' | 'email',
	source?: string
) {
	return () => {
		analytics.track('social_click', { platform, source });
	};
}

/**
 * Auto-track decorator for Svelte components
 * Automatically wraps onclick handlers
 */
export function autoTrack(eventName: string, getProperties?: () => Record<string, unknown>) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			const properties = getProperties ? getProperties() : {};
			analytics.track(eventName, properties);
			return originalMethod.apply(this, args);
		};

		return descriptor;
	};
}
