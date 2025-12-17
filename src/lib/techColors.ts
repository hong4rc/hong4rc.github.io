export const techColors: Record<string, string> = {
	'Node.js': '#339933',
	'TypeScript': '#3178c6',
	'JavaScript': '#f7df1e',
	'MongoDB': '#47a248',
	'Docker': '#2496ed',
	'AWS': '#ff9900',
	'PostgreSQL': '#4169e1',
	'NestJS': '#e0234e',
	'Express': '#000000',
	'Redis': '#dc382d',
	'GraphQL': '#e10098',
	'React': '#61dafb',
	'Vue': '#4fc08d',
	'Svelte': '#ff3e00',
	'Python': '#3776ab',
	'Go': '#00add8',
	'Rust': '#000000',
	'Java': '#007396',
	'Kubernetes': '#326ce5',
	'Git': '#f05032',
	'Linux': '#fcc624',
	'MySQL': '#4479a1',
	'Nginx': '#009639',
	'Firebase': '#ffca28',
	'Vercel': '#000000',
	'Next.js': '#000000',
	'Tailwind': '#06b6d4'
};

export const techIcons: Record<string, string> = {
	'Node.js': 'JS',
	'TypeScript': 'TS',
	'JavaScript': 'JS',
	'MongoDB': 'DB',
	'Docker': 'DK',
	'AWS': 'AWS',
	'PostgreSQL': 'PG',
	'NestJS': 'NS',
	'Express': 'EX',
	'Redis': 'RD',
	'GraphQL': 'GQL',
	'React': 'RE',
	'Vue': 'VU',
	'Svelte': 'SV',
	'Python': 'PY',
	'Go': 'GO',
	'Rust': 'RS',
	'Java': 'JV',
	'Kubernetes': 'K8s',
	'Git': 'GIT',
	'Linux': 'LX',
	'MySQL': 'SQL',
	'Nginx': 'NX',
	'Firebase': 'FB',
	'Vercel': 'VC',
	'Next.js': 'NX',
	'Tailwind': 'TW'
};

export function getTechColor(name: string): string {
	return techColors[name] || 'var(--accent)';
}

export function getTechIcon(name: string): string {
	return techIcons[name] || name.substring(0, 2).toUpperCase();
}
