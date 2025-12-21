import type { PageLoad } from './$types';
import { getAdjacentPosts } from '$lib/blog/posts';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../posts/${params.slug}.md`);
		const { prev, next } = getAdjacentPosts(params.slug);
		return {
			post: {
				...post.metadata,
				slug: params.slug
			},
			Content: post.default,
			prevPost: prev,
			nextPost: next
		};
	} catch {
		return {
			post: null,
			Content: null,
			prevPost: null,
			nextPost: null
		};
	}
};
