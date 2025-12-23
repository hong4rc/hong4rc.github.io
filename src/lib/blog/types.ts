/**
 * Blog post type definitions
 */

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
