/**
 * UTM Builder - Builder Pattern Implementation
 *
 * Provides a fluent API for constructing URLs with UTM parameters.
 *
 * Example:
 * ```typescript
 * const url = new UTMBuilder('https://github.com/hong4rc')
 *   .source('portfolio')
 *   .medium('website')
 *   .campaign('social_links')
 *   .content('footer')
 *   .build();
 * ```
 */

interface UTMParams {
	source?: string;
	medium?: string;
	campaign?: string;
	content?: string;
	term?: string;
}

export class UTMBuilder {
	private params: Map<string, string> = new Map();
	private baseUrl: string;

	/**
	 * Create a new UTM builder with a base URL
	 */
	constructor(url: string) {
		this.baseUrl = url;
	}

	/**
	 * Set the utm_source parameter
	 * Identifies which site sent the traffic
	 */
	source(value: string): this {
		this.params.set('utm_source', value);
		return this;
	}

	/**
	 * Set the utm_medium parameter
	 * Identifies what type of link was used
	 */
	medium(value: string): this {
		this.params.set('utm_medium', value);
		return this;
	}

	/**
	 * Set the utm_campaign parameter
	 * Identifies a specific product promotion or strategic campaign
	 */
	campaign(value: string): this {
		this.params.set('utm_campaign', value);
		return this;
	}

	/**
	 * Set the utm_content parameter
	 * Identifies what specifically was clicked to bring the user to the site
	 */
	content(value: string): this {
		this.params.set('utm_content', value);
		return this;
	}

	/**
	 * Set the utm_term parameter
	 * Identifies search terms
	 */
	term(value: string): this {
		this.params.set('utm_term', value);
		return this;
	}

	/**
	 * Set multiple parameters at once
	 */
	withParams(params: UTMParams): this {
		if (params.source) this.source(params.source);
		if (params.medium) this.medium(params.medium);
		if (params.campaign) this.campaign(params.campaign);
		if (params.content) this.content(params.content);
		if (params.term) this.term(params.term);
		return this;
	}

	/**
	 * Build the final URL with UTM parameters
	 */
	build(): string {
		try {
			const url = new URL(this.baseUrl);

			// Add all UTM parameters
			this.params.forEach((value, key) => {
				url.searchParams.set(key, value);
			});

			return url.toString();
		} catch (error) {
			// If URL parsing fails, return original URL
			console.error('UTMBuilder: Invalid URL', error);
			return this.baseUrl;
		}
	}

	/**
	 * Reset all parameters
	 */
	reset(): this {
		this.params.clear();
		return this;
	}

	/**
	 * Clone this builder
	 */
	clone(): UTMBuilder {
		const builder = new UTMBuilder(this.baseUrl);
		this.params.forEach((value, key) => {
			builder.params.set(key, value);
		});
		return builder;
	}
}

/**
 * Create a UTM builder with default portfolio parameters
 */
export function createPortfolioUTMBuilder(url: string): UTMBuilder {
	return new UTMBuilder(url)
		.source('hong4rc')
		.medium('portfolio')
		.campaign('website');
}

/**
 * Quick helper function for backward compatibility
 */
export function addUTM(url: string, params: UTMParams = {}): string {
	return createPortfolioUTMBuilder(url)
		.withParams(params)
		.build();
}
