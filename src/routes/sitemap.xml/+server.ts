import { config } from '$lib/config';
import { posts } from '$lib/blog/posts';
import type { RequestHandler } from './$types';

export const prerender = true;

interface Page {
	loc: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}

const getPages = (): Page[] => {
	const siteUrl = config.seo.siteUrl;
	const today = new Date().toISOString().split('T')[0];

	const pages: Page[] = [
		{
			loc: siteUrl,
			lastmod: today,
			changefreq: 'weekly',
			priority: 1.0
		}
	];

	// Add blog index if enabled
	if (config.features.showBlog) {
		pages.push({
			loc: `${siteUrl}/blog`,
			lastmod: today,
			changefreq: 'weekly',
			priority: 0.8
		});

		// Add individual blog posts
		posts.forEach(post => {
			pages.push({
				loc: `${siteUrl}/blog/${post.slug}`,
				lastmod: post.date,
				changefreq: 'monthly',
				priority: 0.7
			});
		});
	}

	return pages;
};

export const GET: RequestHandler = async () => {
	const pages = getPages();

	const urlEntries = pages
		.map(
			(page) => `
	<url>
		<loc>${page.loc}</loc>
		${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
		${page.changefreq ? `<changefreq>${page.changefreq}</changefreq>` : ''}
		${page.priority !== undefined ? `<priority>${page.priority}</priority>` : ''}
	</url>`
		)
		.join('');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
