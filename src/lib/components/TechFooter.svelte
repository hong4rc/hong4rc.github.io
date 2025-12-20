<script lang="ts">
	import { config } from '$lib/config';
	import { onMount } from 'svelte';
	import TechIcon from './TechIcon.svelte';
	import { addUTM } from '$lib/utils/utm';

	let commitCount = $state<number | null>(null);
	const version = '1.0.0';
	const linesOfCode = '~2.5k';
	const buildTime = '< 1s';

	onMount(async () => {
		// Fetch commit count from GitHub API
		try {
			const res = await fetch(`https://api.github.com/repos/hong4rc/hong4rc.github.io/commits?per_page=1`, {
				headers: { 'Accept': 'application/vnd.github.v3+json' }
			});
			const linkHeader = res.headers.get('Link');
			if (linkHeader) {
				const match = linkHeader.match(/page=(\d+)>; rel="last"/);
				if (match) {
					commitCount = parseInt(match[1], 10);
				}
			}
		} catch {
			commitCount = null;
		}
	});

	const builtWith = [
		{ name: 'SvelteKit', url: 'https://kit.svelte.dev', icon: 'svelte' },
		{ name: 'TypeScript', url: 'https://www.typescriptlang.org', icon: 'typescript' },
		{ name: 'Catppuccin', url: 'https://catppuccin.com', icon: null },
		{ name: 'GitHub Pages', url: 'https://pages.github.com', icon: 'github' }
	];
</script>

<footer class="tech-footer">
	<div class="footer-content">
		<!-- Stats Row -->
		<div class="stats-row">
			<a
				href={addUTM(`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(config.seo.siteUrl)}`, { content: 'footer-lighthouse' })}
				target="_blank"
				rel="noopener noreferrer"
				class="stat-badge"
				title="Check Lighthouse Score"
			>
				<span class="stat-icon">⚡</span>
				<span class="stat-label">Lighthouse</span>
			</a>

			{#if commitCount !== null}
				<a
					href={addUTM('https://github.com/hong4rc/hong4rc.github.io/commits', { content: 'footer-commits' })}
					target="_blank"
					rel="noopener noreferrer"
					class="stat-badge"
					title="View commits"
				>
					<span class="stat-value">{commitCount}</span>
					<span class="stat-label">commits</span>
				</a>
			{/if}

			<span class="stat-badge" title="Lines of code">
				<span class="stat-value">{linesOfCode}</span>
				<span class="stat-label">lines</span>
			</span>

			<span class="stat-badge" title="Version">
				<span class="stat-value">v{version}</span>
				<span class="stat-label">version</span>
			</span>

			<span class="stat-badge" title="Build time">
				<span class="stat-value">{buildTime}</span>
				<span class="stat-label">build</span>
			</span>
		</div>

		<!-- Built With -->
		<div class="built-with">
			<span class="built-label">Built with</span>
			<div class="tech-list">
				{#each builtWith as tech}
					<a href={addUTM(tech.url, { content: 'footer-builtwith' })} target="_blank" rel="noopener noreferrer" class="tech-item">
						{#if tech.icon}
							<TechIcon icon={tech.icon} colored />
						{/if}
						{tech.name}
					</a>
				{/each}
			</div>
		</div>

		<!-- Copyright & Source -->
		<div class="footer-bottom">
			<p class="copyright">&copy; {new Date().getFullYear()} {config.name}</p>
			<a
				href={addUTM('https://github.com/hong4rc/hong4rc.github.io', { content: 'footer-source' })}
				target="_blank"
				rel="noopener noreferrer"
				class="source-link"
			>
				view source →
			</a>
		</div>
	</div>
</footer>

<style>
	.tech-footer {
		padding: 1rem 2rem;
		border-top: 1px solid var(--surface0);
	}

	.footer-content {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: center;
	}

	.stats-row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
	}

	.stat-badge {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.35rem 0.65rem;
		background-color: var(--surface0);
		border-radius: 4px;
		font-size: 0.75rem;
		color: var(--text);
		text-decoration: none;
		transition: background-color 0.2s;
	}

	.stat-badge:hover {
		background-color: var(--surface1);
	}

	.stat-icon {
		font-size: 0.85rem;
	}

	.stat-value {
		color: var(--accent);
		font-weight: 600;
	}

	.stat-label {
		color: var(--subtext);
	}

	.built-with {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.built-label {
		font-size: 0.75rem;
		color: var(--subtext);
	}

	.tech-list {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.tech-item {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.75rem;
		color: var(--text);
		text-decoration: none;
		padding: 0.25rem 0.5rem;
		background-color: var(--mantle);
		border-radius: 3px;
		transition: color 0.2s;
	}

	.tech-item:hover {
		color: var(--accent);
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 0.75rem;
	}

	.copyright {
		color: var(--surface2);
	}

	.source-link {
		color: var(--subtext);
		text-decoration: none;
		transition: color 0.2s;
	}

	.source-link:hover {
		color: var(--accent);
	}

	@media (max-width: 480px) {
		.stats-row {
			gap: 0.5rem;
		}

		.stat-badge {
			padding: 0.25rem 0.5rem;
			font-size: 0.7rem;
		}
	}
</style>
