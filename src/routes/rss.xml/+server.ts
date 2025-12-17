import { config } from '$lib/config';
import type { RequestHandler } from './$types';

interface BlogPost {
	title: string;
	slug: string;
	description: string;
	date: string;
	content?: string;
}

// Placeholder for future blog posts
// When blog is enabled, this should be imported from a blog module
const getBlogPosts = (): BlogPost[] => {
	// Return empty array if blog is not enabled
	if (!config.features.showBlog) {
		return [];
	}

	// TODO: Replace with actual blog post fetching
	// Example structure:
	// return [
	//   { title: 'Post Title', slug: 'post-slug', description: 'Description', date: '2024-01-01' }
	// ];
	return [];
};

const escapeXml = (str: string): string => {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
};

export const GET: RequestHandler = async () => {
	const posts = getBlogPosts();
	const siteUrl = config.seo.siteUrl;

	const rssItems = posts.map(post => `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${siteUrl}/blog/${post.slug}</link>
			<guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
			<description>${escapeXml(post.description)}</description>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		</item>
	`).join('');

	const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(config.name)} - ${escapeXml(config.title)}</title>
		<link>${siteUrl}</link>
		<description>${escapeXml(config.bio)}</description>
		<language>en</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
		${rssItems}
	</channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
