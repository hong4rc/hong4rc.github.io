/**
 * Analytics Module Entry Point
 *
 * Architecture:
 * - Singleton Pattern: AnalyticsManager is a singleton
 * - Strategy Pattern: Plugins implement AnalyticsPlugin interface
 * - Facade Pattern: Tracker provides simplified API
 * - Decorator Pattern: Track functions wrap event handlers
 * - Observer Pattern: Manager notifies all plugins of events
 */

export { analytics } from './AnalyticsManager';
export { GoogleAnalyticsPlugin } from './plugins/GoogleAnalyticsPlugin';
export { tracker } from './trackers';
export { track, trackNavigation, trackExternalLink, trackSocial } from './decorators';
export type { AnalyticsPlugin } from './types';
export { EventTypes } from './types';
