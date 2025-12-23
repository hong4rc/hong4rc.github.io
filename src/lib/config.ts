export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description?: string;
  tech?: string[];
  current?: boolean;
}

export interface SkillItem {
  name: string;
  level: number;
}

export const config = {
  name: 'Hong4rc',
  title: 'Backend Developer',
  bio: 'backemd dev. lazy by desgin, simpel by chocie',
  experience: 6,

  techStack: [
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'NestJS', icon: 'nestjs' },
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Redis', icon: 'redis' },
    { name: 'AWS', icon: 'amazonwebservices' }
  ],

  skills: [
    { name: 'Node.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'MongoDB', level: 80 },
    { name: 'Docker', level: 75 },
    { name: 'AWS', level: 70 },
    { name: 'PostgreSQL', level: 70 }
  ] as SkillItem[],

  experience_timeline: [
    {
      role: 'Node Whisperer',
      company: 'Everfit',
      period: '2022 - Present',
      description: 'Professional Promise keeper. Still waiting for some callbacks from 2022',
      tech: ['Node.js', 'NestJS', 'MongoDB', 'AWS'],
      current: true
    },
    {
      role: 'Paperwork Slayer',
      company: 'EcoIt',
      period: '2020 - 2022',
      description: 'Digitized government chaos. Documents now flow faster than bureaucracy can approve them',
      tech: ['Java', 'PostgreSQL', 'OCR', 'Digital Signatures']
    },
    {
      role: 'Frame Rate Guardian',
      company: 'Gameloft',
      period: '2019 - 2020',
      description: 'Made games go brrr. Mass-murdered memory leaks. Fluent in segfault',
      tech: ['C++', 'Python', 'Performance Optimization']
    }
  ] as ExperienceItem[],

  tools: [
    {
      category: 'Terminal', icon: '▶', items: [
        { name: 'Ghostty', url: 'https://ghostty.org' },
        { name: 'zsh + tmux', url: 'https://github.com/tmux/tmux' }
      ]
    },
    {
      category: 'IDE', icon: '◇', items: [
        { name: 'LazyVim', url: 'https://www.lazyvim.org' },
        { name: 'VS Code', url: 'https://code.visualstudio.com' }
      ]
    },
    {
      category: 'Database', icon: '●', items: [
        { name: 'Compass', url: 'https://www.mongodb.com/products/compass' },
        { name: 'DataGrip', url: 'https://www.jetbrains.com/datagrip' }
      ]
    },
    {
      category: 'Fonts', icon: '◈', items: [
        { name: 'Fira Code', url: 'https://github.com/tonsky/FiraCode' },
        { name: 'Cascadia Code', url: 'https://github.com/microsoft/cascadia-code' }
      ]
    },
    {
      category: 'OS', icon: '○', items: [
        { name: 'macOS', url: 'https://www.apple.com/macos' },
        { name: 'Fedora', url: 'https://fedoraproject.org' }
      ]
    },
    {
      category: 'Keyboard', icon: '⌨', items: [
        { name: 'Colemak', url: 'https://colemak.com' },
        { name: 'Sofle v2', url: 'https://github.com/josefadamcik/SofleKeyboard' }
      ]
    },
    {
      category: 'Package Manager', icon: '◉', items: [
        { name: 'mise', url: 'https://mise.jdx.dev' }
      ]
    },
    {
      category: 'CLI', icon: '→', items: [
        { name: 'zoxide', url: 'https://github.com/ajeetdsouza/zoxide' },
        { name: 'fzf', url: 'https://github.com/junegunn/fzf' }
      ]
    }
  ],

  funFacts: [
    {
      icon: '⌨️',
      title: 'Colemak User',
      description: 'QWERTY is for normies. My fingers travel less, my brain works more'
    },
    {
      icon: '🪓',
      title: 'Split Keyboard',
      description: 'Sofle v2. Because one keyboard is never enough'
    },
    {
      icon: '🌙',
      title: 'Dark Mode Only',
      description: "Light mode? My eyes left the chat"
    }
  ],

  availability: {
    available: true,
    status: 'Open for opportunities',
    message: 'Interested in backend roles and consulting'
  },

  contact: {
    email: 'hong4rc@gmail.com',
    github: 'https://github.com/hong4rc',
    linkedin: 'https://linkedin.com/in/hong4rc'
  },

  seo: {
    siteUrl: 'https://hong4rc.github.io',
    ogImage: '/og-image.png',
    twitterHandle: '@hong4rc',
    description: 'Backend Developer with 6+ years of experience in Node.js, NestJS, MongoDB, and AWS. Building scalable APIs and microservices.',
    keywords: ['backend developer', 'nodejs', 'nestjs', 'mongodb', 'aws', 'typescript', 'api development', 'software engineer', 'vietnam']
  },

  analytics: {
    googleAnalyticsId: 'G-YL4P1WR0S1'
  },

  features: {
    showProjects: false,
    showBlog: true,
    showExperience: true,
    showGitHubStats: true,
    showSkills: false,
    showFunFacts: true,
    showOpenSource: true,
    showTools: true,
    showAvailability: true,
    showGuestbook: false,
    enableAnalytics: true,
    enableRss: true
  },

  keys: {
    sections: {
      home: 'h',
      tech: 't',
      skills: 's',
      experience: 'e',
      opensource: 'o',
      tools: 'l',
      github: 'g',
      contact: 'c',
      availability: 'a'
    }
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
