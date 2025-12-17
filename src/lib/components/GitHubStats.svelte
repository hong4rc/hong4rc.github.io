<script lang="ts">
	import { config } from '$lib/config';
	import { onMount } from 'svelte';

	interface GitHubUser {
		public_repos: number;
		followers: number;
		following: number;
	}

	let stats: GitHubUser | null = null;
	let loading = true;
	let error = false;

	const username = config.contact.github.split('/').pop() || '';

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
	<section class="github-stats">
		<h2>GitHub</h2>
		{#if loading}
			<div class="loading">
				<span class="cursor">_</span>
			</div>
		{:else if error || !stats}
			<p class="error">Failed to load stats</p>
		{:else}
			<div class="stats-grid">
				<a
					href="{config.contact.github}?tab=repositories"
					class="stat-card"
					target="_blank"
					rel="noopener"
				>
					<span class="stat-value">{stats.public_repos}</span>
					<span class="stat-label">Repositories</span>
				</a>
				<a
					href="{config.contact.github}?tab=followers"
					class="stat-card"
					target="_blank"
					rel="noopener"
				>
					<span class="stat-value">{stats.followers}</span>
					<span class="stat-label">Followers</span>
				</a>
				<a
					href="{config.contact.github}?tab=following"
					class="stat-card"
					target="_blank"
					rel="noopener"
				>
					<span class="stat-value">{stats.following}</span>
					<span class="stat-label">Following</span>
				</a>
			</div>
			<a href={config.contact.github} class="github-link" target="_blank" rel="noopener">
				@{username}
			</a>
		{/if}
	</section>
{/if}

<style>
	.github-stats {
		padding: 4rem 2rem;
		text-align: center;
	}

	h2 {
		font-size: 1.5rem;
		color: var(--text);
		margin-bottom: 2rem;
	}

	.loading {
		font-size: 1.5rem;
		color: var(--accent);
	}

	.cursor {
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.error {
		color: var(--subtext);
	}

	.stats-grid {
		display: flex;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
		margin-bottom: 1.5rem;
	}

	.stat-card {
		background-color: var(--surface0);
		padding: 1.5rem 2rem;
		border-radius: 8px;
		min-width: 120px;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.stat-card:hover {
		background-color: var(--surface1);
		transform: translateY(-2px);
	}

	.stat-value {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		color: var(--accent);
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
