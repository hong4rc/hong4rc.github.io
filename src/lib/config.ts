export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description?: string;
  tech?: string[];
  current?: boolean;
}

export const config = {
  name: 'Hong4rc',
  title: 'Backend Developer',
  bio: 'backend dev. lazy by design, simple by choice',
  experience: 6,

  techStack: ['Node.js', 'NestJS', 'MongoDB', 'Docker', 'AWS'],

  experience_timeline: [
    {
      role: 'Senior Backend Developer',
      company: 'Your Company',
      period: '2022 - Present',
      description: 'Building scalable backend systems',
      tech: ['Node.js', 'NestJS', 'MongoDB', 'AWS'],
      current: true
    },
    {
      role: 'Backend Developer',
      company: 'Previous Company',
      period: '2019 - 2022',
      description: 'Developed RESTful APIs and microservices',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'Docker']
    }
  ] as ExperienceItem[],

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
    showExperience: true,
    showGitHubStats: true,
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
