/**
 * Blog Posts - Backward Compatibility Layer
 *
 * This file maintains backward compatibility while using the new Repository Pattern.
 * All functions now delegate to the BlogRepository.
 *
 * For new code, prefer importing from './BlogRepository' directly.
 */

import type { BlogPost, PostModule } from './types';

export type { BlogPost, PostModule } from './types';
export { getBlogRepository } from './BlogRepository';
export type { BlogRepository } from './BlogRepository';

// Get the singleton repository instance
const repository = await import('./BlogRepository').then((m) => m.getBlogRepository());

// Eager load posts for backward compatibility
export const posts = await repository.getAll();

/**
 * @deprecated Use repository.getBySlug() instead
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
	return posts.find((p) => p.slug === slug);
}

/**
 * @deprecated Use repository.getByTag() instead
 */
export function getPostsByTag(tag: string): BlogPost[] {
	return posts.filter((p) => p.tags.includes(tag));
}

/**
 * @deprecated Use repository.getAllTags() instead
 */
export function getAllTags(): string[] {
	const tags = new Set<string>();
	posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
	return Array.from(tags).sort();
}

/**
 * @deprecated Use repository.getPostContent() instead
 */
export async function getPostContent(slug: string) {
	return repository.getPostContent(slug);
}

/**
 * @deprecated Use repository.getAdjacentPosts() instead
 */
export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
	const index = posts.findIndex((p) => p.slug === slug);
	return {
		prev: index < posts.length - 1 ? posts[index + 1] : null,
		next: index > 0 ? posts[index - 1] : null
	};
}
