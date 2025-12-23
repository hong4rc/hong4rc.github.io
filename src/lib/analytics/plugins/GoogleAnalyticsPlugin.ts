import { config } from '$lib/config';
import type { AnalyticsPlugin } from '../types';

/**
 * Google Analytics Plugin (Strategy Pattern Implementation)
 */
export class GoogleAnalyticsPlugin implements AnalyticsPlugin {
	name = 'google-analytics';
	private gaId: string;

	constructor(measurementId: string) {
		this.gaId = measurementId;
	}

	init(): void {
		if (typeof window.gtag !== 'undefined') return;

		// Load GA script
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
		document.head.appendChild(script);

		// Initialize gtag
		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag(...args: unknown[]) {
			window.dataLayer.push(args);
		};
		window.gtag('js', new Date());
		window.gtag('config', this.gaId);
	}

	track(eventName: string, properties?: Record<string, unknown>): void {
		if (typeof window.gtag !== 'function') return;

		window.gtag('event', eventName, properties);
	}

	identify(userId: string, traits?: Record<string, unknown>): void {
		if (typeof window.gtag !== 'function') return;

		window.gtag('config', this.gaId, {
			user_id: userId,
			...traits
		});
	}
}
