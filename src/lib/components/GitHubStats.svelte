<script lang="ts">
	import { config } from '$lib/config';
	import { reveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';
	import Skeleton from './Skeleton.svelte';

	interface GitHubUser {
		public_repos: number;
		followers: number;
		following: number;
	}

	let stats: GitHubUser | null = null;
	let loading = true;
	let error = false;

	const username = config.contact.github.split('/').pop() || '';

	const statItems = [
		{ key: 'public_repos', label: 'Repositories', icon: 'repo', color: '#8b5cf6', tab: 'repositories' },
		{ key: 'followers', label: 'Followers', icon: 'user', color: '#ec4899', tab: 'followers' },
		{ key: 'following', label: 'Following', icon: 'heart', color: '#f97316', tab: 'following' }
	] as const;

	onMount(async () => {
		if (!config.features.showGitHubStats || !username) {
			loading = false;
			return;
		}

		try {
			const response = await fetch(`https://api.github.com/users/${username}`);
			if (response.ok) {
				stats = await response.json();
			} else {
				error = true;
			}
		} catch {
			error = true;
		} finally {
			loading = false;
		}
	});
</script>

{#if config.features.showGitHubStats}
	<section class="github-stats" use:reveal>
		<h2>GitHub</h2>
		{#if loading}
			<div class="stats-grid">
				{#each [1, 2, 3] as _}
					<div class="stat-card skeleton-card">
						<Skeleton width="24px" height="24px" />
						<Skeleton width="3rem" height="1.5rem" />
						<Skeleton width="5rem" height="0.85rem" />
					</div>
				{/each}
			</div>
		{:else if error || !stats}
			<p class="error">Failed to load stats</p>
		{:else}
			<div class="stats-grid">
				{#each statItems as item}
					<a
						href="{config.contact.github}?tab={item.tab}"
						class="stat-card"
						style="--color: {item.color}"
						target="_blank"
						rel="noopener"
					>
						<span class="stat-icon" aria-hidden="true">
							{#if item.icon === 'repo'}
								<svg viewBox="0 0 16 16" fill="currentColor">
									<path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/>
								</svg>
							{:else if item.icon === 'user'}
								<svg viewBox="0 0 16 16" fill="currentColor">
									<path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>
								</svg>
							{:else}
								<svg viewBox="0 0 16 16" fill="currentColor">
									<path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"/>
								</svg>
							{/if}
						</span>
						<span class="stat-value">{stats[item.key]}</span>
						<span class="stat-label">{item.label}</span>
					</a>
				{/each}
			</div>
			<a href={config.contact.github} class="github-link" target="_blank" rel="noopener">
				@{username}
			</a>
		{/if}
	</section>
{/if}

<style>
	.github-stats {
		padding: 0.5rem 2rem 1rem;
		text-align: center;
	}

	.error {
		color: var(--subtext);
	}

	.stats-grid {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.stat-card {
		background-color: var(--surface0);
		padding: 1rem 1.5rem;
		border-radius: 8px;
		min-width: 100px;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.stat-card:hover:not(.skeleton-card) {
		background-color: var(--surface1);
		transform: translateY(-2px);
	}

	.skeleton-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.stat-icon {
		display: block;
		margin-bottom: 0.5rem;
	}

	.stat-icon svg {
		width: 24px;
		height: 24px;
		color: var(--color);
	}

	.stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color);
	}

	.stat-label {
		display: block;
		font-size: 0.85rem;
		color: var(--subtext);
		margin-top: 0.25rem;
	}

	.github-link {
		color: var(--subtext);
		font-size: 0.9rem;
	}

	.github-link:hover {
		color: var(--accent);
	}
</style>
