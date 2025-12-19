export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	readTime?: string;
}

export const posts: BlogPost[] = [
	{
		slug: 'welcome-to-my-blog',
		title: 'Welcome to My Blog',
		description: 'First post! Sharing my journey as a backend developer, from Gameloft to building government systems to fitness tech.',
		date: '2024-12-20',
		tags: ['intro', 'life'],
		readTime: '2 min'
	},
	{
		slug: 'why-i-switched-to-neovim',
		title: 'Why I Switched to Neovim',
		description: 'After years of VS Code, I made the jump to Neovim with LazyVim. Here is what changed.',
		date: '2024-12-15',
		tags: ['neovim', 'tools', 'productivity'],
		readTime: '5 min'
	},
	{
		slug: 'colemak-journey',
		title: 'My Colemak Journey',
		description: 'Switching keyboard layouts while working full-time. The pain, the gain, and the 3 months it took.',
		date: '2024-12-10',
		tags: ['keyboard', 'productivity'],
		readTime: '4 min'
	}
];

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
