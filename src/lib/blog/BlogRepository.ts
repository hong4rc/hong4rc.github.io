/**
 * Blog Repository Pattern
 *
 * Provides an abstraction layer for blog post data access.
 * Makes it easy to switch data sources (Markdown → CMS → API)
 * and add features like caching, lazy loading, etc.
 */

import type { BlogPost, PostModule } from './types';

/**
 * Repository interface for blog post operations
 */
export interface BlogRepository {
	/**
	 * Get all published blog posts, sorted by date (newest first)
	 */
	getAll(): Promise<BlogPost[]>;

	/**
	 * Get a single post by its slug
	 */
	getBySlug(slug: string): Promise<BlogPost | null>;

	/**
	 * Get all posts with a specific tag
	 */
	getByTag(tag: string): Promise<BlogPost[]>;

	/**
	 * Get all unique tags from all posts
	 */
	getAllTags(): Promise<string[]>;

	/**
	 * Search posts by title or content
	 */
	search(query: string): Promise<BlogPost[]>;

	/**
	 * Get the previous and next posts relative to a given slug
	 */
	getAdjacentPosts(slug: string): Promise<{ prev: BlogPost | null; next: BlogPost | null }>;

	/**
	 * Get the full content/component for a post
	 */
	getPostContent(slug: string): Promise<PostModule | null>;
}

/**
 * Markdown-based blog repository implementation
 *
 * Loads blog posts from markdown files in /src/posts/
 */
export class MarkdownBlogRepository implements BlogRepository {
	private posts: BlogPost[] = [];
	private postModules: Record<string, PostModule> = {};
	private initialized = false;

	constructor() {
		this.initialize();
	}

	/**
	 * Lazy initialization - load and parse all markdown files
	 */
	private initialize(): void {
		if (this.initialized) return;

		// Import all markdown files
		const postFiles = import.meta.glob<PostModule>('/src/posts/*.md', { eager: true });

		// Parse and store posts
		this.posts = Object.entries(postFiles)
			.map(([path, module]) => {
				const slug = path.split('/').pop()?.replace('.md', '') || '';
				this.postModules[slug] = module;
				return {
					...module.metadata,
					slug
				};
			})
			.filter((post) => post.published)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		this.initialized = true;
	}

	async getAll(): Promise<BlogPost[]> {
		return [...this.posts];
	}

	async getBySlug(slug: string): Promise<BlogPost | null> {
		return this.posts.find((p) => p.slug === slug) || null;
	}

	async getByTag(tag: string): Promise<BlogPost[]> {
		return this.posts.filter((p) => p.tags.includes(tag));
	}

	async getAllTags(): Promise<string[]> {
		const tags = new Set<string>();
		this.posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
		return Array.from(tags).sort();
	}

	async search(query: string): Promise<BlogPost[]> {
		const lowerQuery = query.toLowerCase();
		return this.posts.filter(
			(p) =>
				p.title.toLowerCase().includes(lowerQuery) ||
				p.description.toLowerCase().includes(lowerQuery) ||
				p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
		);
	}

	async getAdjacentPosts(slug: string): Promise<{ prev: BlogPost | null; next: BlogPost | null }> {
		const index = this.posts.findIndex((p) => p.slug === slug);
		return {
			prev: index < this.posts.length - 1 ? this.posts[index + 1] : null,
			next: index > 0 ? this.posts[index - 1] : null
		};
	}

	async getPostContent(slug: string): Promise<PostModule | null> {
		return this.postModules[slug] || null;
	}
}

/**
 * Cached blog repository decorator
 *
 * Wraps another repository and adds caching for better performance
 */
export class CachedBlogRepository implements BlogRepository {
	private cache: Map<string, any> = new Map();
	private cacheTTL = 5 * 60 * 1000; // 5 minutes

	constructor(private repository: BlogRepository) {}

	private getCacheKey(method: string, ...args: any[]): string {
		return `${method}:${JSON.stringify(args)}`;
	}

	private getFromCache<T>(key: string): T | null {
		const cached = this.cache.get(key);
		if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
			return cached.data;
		}
		return null;
	}

	private setCache(key: string, data: any): void {
		this.cache.set(key, { data, timestamp: Date.now() });
	}

	async getAll(): Promise<BlogPost[]> {
		const key = this.getCacheKey('getAll');
		const cached = this.getFromCache<BlogPost[]>(key);
		if (cached) return cached;

		const result = await this.repository.getAll();
		this.setCache(key, result);
		return result;
	}

	async getBySlug(slug: string): Promise<BlogPost | null> {
		const key = this.getCacheKey('getBySlug', slug);
		const cached = this.getFromCache<BlogPost | null>(key);
		if (cached !== null) return cached;

		const result = await this.repository.getBySlug(slug);
		this.setCache(key, result);
		return result;
	}

	async getByTag(tag: string): Promise<BlogPost[]> {
		const key = this.getCacheKey('getByTag', tag);
		const cached = this.getFromCache<BlogPost[]>(key);
		if (cached) return cached;

		const result = await this.repository.getByTag(tag);
		this.setCache(key, result);
		return result;
	}

	async getAllTags(): Promise<string[]> {
		const key = this.getCacheKey('getAllTags');
		const cached = this.getFromCache<string[]>(key);
		if (cached) return cached;

		const result = await this.repository.getAllTags();
		this.setCache(key, result);
		return result;
	}

	async search(query: string): Promise<BlogPost[]> {
		// Don't cache search results (they change frequently)
		return this.repository.search(query);
	}

	async getAdjacentPosts(slug: string): Promise<{ prev: BlogPost | null; next: BlogPost | null }> {
		const key = this.getCacheKey('getAdjacentPosts', slug);
		const cached = this.getFromCache<{ prev: BlogPost | null; next: BlogPost | null }>(key);
		if (cached) return cached;

		const result = await this.repository.getAdjacentPosts(slug);
		this.setCache(key, result);
		return result;
	}

	async getPostContent(slug: string): Promise<PostModule | null> {
		const key = this.getCacheKey('getPostContent', slug);
		const cached = this.getFromCache<PostModule | null>(key);
		if (cached !== null) return cached;

		const result = await this.repository.getPostContent(slug);
		this.setCache(key, result);
		return result;
	}

	/**
	 * Clear the cache
	 */
	clearCache(): void {
		this.cache.clear();
	}
}

/**
 * Singleton instance of the blog repository
 */
let repositoryInstance: BlogRepository | null = null;

/**
 * Get the blog repository instance (Singleton + Factory)
 */
export function getBlogRepository(cached: boolean = true): BlogRepository {
	if (!repositoryInstance) {
		const baseRepo = new MarkdownBlogRepository();
		repositoryInstance = cached ? new CachedBlogRepository(baseRepo) : baseRepo;
	}
	return repositoryInstance;
}
