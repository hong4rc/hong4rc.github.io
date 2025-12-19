import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../posts/${params.slug}.md`);
		return {
			post: {
				...post.metadata,
				slug: params.slug
			},
			Content: post.default
		};
	} catch {
		return {
			post: null,
			Content: null
		};
	}
};
