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
    { name: 'Docker', icon: 'docker' },
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

  tools: [
    { category: 'Terminal', icon: '▶', items: [
      { name: 'Ghostty', url: 'https://ghostty.org' },
      { name: 'tmux', url: 'https://github.com/tmux/tmux' },
      { name: 'Starship', url: 'https://starship.rs' }
    ]},
    { category: 'Editor', icon: '◆', items: [
      { name: 'LazyVim', url: 'https://www.lazyvim.org' },
      { name: 'lazygit', url: 'https://github.com/jesseduffield/lazygit' }
    ]},
    { category: 'IDE', icon: '◇', items: [
      { name: 'VS Code', url: 'https://code.visualstudio.com' }
    ]},
    { category: 'Database', icon: '●', items: [
      { name: 'Compass', url: 'https://www.mongodb.com/products/compass' },
      { name: 'DataGrip', url: 'https://www.jetbrains.com/datagrip' }
    ]},
    { category: 'Fonts', icon: '◈', items: [
      { name: 'Fira Code', url: 'https://github.com/tonsky/FiraCode' },
      { name: 'Cascadia Code', url: 'https://github.com/microsoft/cascadia-code' }
    ]},
    { category: 'OS', icon: '○', items: [
      { name: 'macOS', url: 'https://www.apple.com/macos' },
      { name: 'Fedora', url: 'https://fedoraproject.org' }
    ]},
    { category: 'Keyboard', icon: '⌨', items: [
      { name: 'Colemak', url: 'https://colemak.com' },
      { name: 'Sofle v2', url: 'https://github.com/josefadamcik/SofleKeyboard' }
    ]},
    { category: 'Dotfiles', icon: '◎', items: [
      { name: 'stow', url: 'https://www.gnu.org/software/stow' }
    ]},
    { category: 'Package Manager', icon: '◉', items: [
      { name: 'mise', url: 'https://mise.jdx.dev' }
    ]},
    { category: 'CLI', icon: '→', items: [
      { name: 'zoxide', url: 'https://github.com/ajeetdsouza/zoxide' },
      { name: 'fzf', url: 'https://github.com/junegunn/fzf' }
    ]}
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
    showSkills: true,
    showOpenSource: true,
    showTools: true,
    showAvailability: true,
    enableAnalytics: false
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
