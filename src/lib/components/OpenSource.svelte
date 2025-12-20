<script lang="ts">
	import { config } from '$lib/config';
	import { reveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';
	import { addUTM } from '$lib/utils/utm';

	interface Repo {
		author: string;
		name: string;
		description: string;
		language: string;
	}

	let repos: Repo[] = [];
	let loading = true;

	const username = config.contact.github.split('/').pop() || '';

	onMount(async () => {
		if (!config.features.showOpenSource || !username) {
			loading = false;
			return;
		}

		try {
			// Fetch pinned repositories from profile
			const response = await fetch(
				`https://pinned.berrysauce.dev/get/${username}`
			);
			if (response.ok) {
				repos = await response.json();
			}
		} catch {
			// ignore
		} finally {
			loading = false;
		}
	});
</script>

{#if config.features.showOpenSource}
	<section class="opensource" use:reveal>
		<h2>Open Source</h2>
		{#if loading}
			<p class="loading">_</p>
		{:else if repos.length}
			<div class="repos-grid">
				{#each repos as repo}
					<a href={addUTM(`https://github.com/${repo.author}/${repo.name}`, { content: 'opensource' })} class="repo-card" target="_blank" rel="noopener">
						<h3><span class="author">{repo.author}/</span>{repo.name}</h3>
						<p class="desc">{repo.description || 'No description'}</p>
						{#if repo.language}
							<div class="meta">
								<span class="lang">{repo.language}</span>
							</div>
						{/if}
					</a>
				{/each}
			</div>
		{:else}
			<p class="empty">No public repos</p>
		{/if}
	</section>
{/if}

<style>
	.opensource {
		padding: 4rem 2rem;
	}

	h2 {
		font-size: 1.5rem;
		color: var(--text);
		text-align: center;
		margin-bottom: 2rem;
	}

	.loading, .empty {
		text-align: center;
		color: var(--subtext);
	}

	.repos-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.repo-card {
		background-color: var(--surface0);
		padding: 1.25rem;
		border-radius: 8px;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.repo-card:hover {
		background-color: var(--surface1);
		transform: translateY(-2px);
	}

	h3 {
		font-size: 1rem;
		color: var(--accent);
		margin-bottom: 0.5rem;
	}

	.author {
		color: var(--subtext);
		font-weight: 400;
	}

	.desc {
		font-size: 0.85rem;
		color: var(--subtext);
		margin-bottom: 0.75rem;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.meta {
		display: flex;
		gap: 1rem;
		font-size: 0.8rem;
		color: var(--subtext);
	}
</style>
