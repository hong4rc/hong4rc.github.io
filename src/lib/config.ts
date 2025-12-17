export const config = {
	name: 'Hong4rc',
	title: 'Backend Developer',
	bio: 'just a backend dev, lazy guy, do simple if can',
	experience: 6,

	techStack: ['Node.js', 'NestJS', 'MongoDB', 'Docker', 'AWS'],

	contact: {
		email: 'hong4rc@gmail.com',
		github: 'https://github.com/hong4rc',
		linkedin: 'https://linkedin.com/in/hong4rc'
	},

	seo: {
		siteUrl: 'https://hong4rc.github.io',
		ogImage: '/og-image.png',
		twitterHandle: '@hong4rc'
	},

	analytics: {
		googleAnalyticsId: '' // Add your GA4 ID here, e.g., 'G-XXXXXXXXXX'
	},

	features: {
		showProjects: false,
		showBlog: false,
		enableAnalytics: false
	}
};

export type Theme = 'latte' | 'frappe' | 'macchiato' | 'mocha';

export const themes: { id: Theme; name: string; icon: string }[] = [
	{ id: 'latte', name: 'Latte', icon: '☀️' },
	{ id: 'frappe', name: 'Frappé', icon: '🌤️' },
	{ id: 'macchiato', name: 'Macchiato', icon: '🌙' },
	{ id: 'mocha', name: 'Mocha', icon: '🌑' }
];

export const defaultTheme: Theme = 'frappe';
