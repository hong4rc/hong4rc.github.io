export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	readTime?: string;
	published: boolean;
}

export interface PostModule {
	metadata: BlogPost;
	default: ConstructorOfATypedSvelteComponent;
}

// Import all markdown files from posts directory
const postFiles = import.meta.glob<PostModule>('/src/posts/*.md', { eager: true });

// Parse posts from markdown files
export const posts: BlogPost[] = Object.entries(postFiles)
	.map(([path, module]) => {
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		return {
			...module.metadata,
			slug
		};
	})
	.filter(post => post.published)
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPostBySlug(slug: string): BlogPost | undefined {
	return posts.find(p => p.slug === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
	return posts.filter(p => p.tags.includes(tag));
}

export function getAllTags(): string[] {
	const tags = new Set<string>();
	posts.forEach(p => p.tags.forEach(t => tags.add(t)));
	return Array.from(tags).sort();
}

export async function getPostContent(slug: string): Promise<PostModule | null> {
	const path = `/src/posts/${slug}.md`;
	if (postFiles[path]) {
		return postFiles[path];
	}
	return null;
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
	const index = posts.findIndex(p => p.slug === slug);
	return {
		prev: index < posts.length - 1 ? posts[index + 1] : null,
		next: index > 0 ? posts[index - 1] : null
	};
}
