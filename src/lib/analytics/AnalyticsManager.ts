import { browser, dev } from '$app/environment';
import { config } from '$lib/config';
import type { AnalyticsPlugin } from './types';

/**
 * Singleton Analytics Manager using Observer Pattern
 * Manages all analytics plugins and event tracking
 */
class AnalyticsManager {
	private static instance: AnalyticsManager;
	private plugins: AnalyticsPlugin[] = [];
	private initialized = false;

	private constructor() {}

	static getInstance(): AnalyticsManager {
		if (!AnalyticsManager.instance) {
			AnalyticsManager.instance = new AnalyticsManager();
		}
		return AnalyticsManager.instance;
	}

	/**
	 * Register an analytics plugin (Strategy Pattern)
	 */
	register(plugin: AnalyticsPlugin): void {
		this.plugins.push(plugin);
		if (this.initialized) {
			plugin.init();
		}
	}

	/**
	 * Initialize all registered plugins
	 */
	init(): void {
		if (!browser || dev || this.initialized) return;

		this.plugins.forEach((plugin) => plugin.init());
		this.initialized = true;
	}

	/**
	 * Track an event through all plugins
	 */
	track(eventName: string, properties?: Record<string, unknown>): void {
		if (!browser || dev || !config.features.enableAnalytics) return;

		this.plugins.forEach((plugin) => {
			try {
				plugin.track(eventName, properties);
			} catch (error) {
				console.error(`Analytics plugin error:`, error);
			}
		});
	}

	/**
	 * Track page view
	 */
	pageView(path: string, properties?: Record<string, unknown>): void {
		this.track('page_view', { path, ...properties });
	}

	/**
	 * Identify user (if needed for future user tracking)
	 */
	identify(userId: string, traits?: Record<string, unknown>): void {
		this.plugins.forEach((plugin) => {
			if (plugin.identify) {
				plugin.identify(userId, traits);
			}
		});
	}
}

export const analytics = AnalyticsManager.getInstance();
