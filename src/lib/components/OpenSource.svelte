<script lang="ts">
	import { config } from '$lib/config';
	import { reveal } from '$lib/actions/reveal';
	import { onMount } from 'svelte';
	import { addUTM } from '$lib/utils/utm';
	import Skeleton from './Skeleton.svelte';

	interface Repo {
		author: string;
		name: string;
		description: string;
		language: string;
	}

	const langIcons: Record<string, { icon: string; color: string }> = {
		JavaScript: { icon: 'JS', color: '#f7df1e' },
		TypeScript: { icon: 'TS', color: '#3178c6' },
		Python: { icon: 'Py', color: '#3776ab' },
		Rust: { icon: 'Rs', color: '#dea584' },
		Go: { icon: 'Go', color: '#00add8' },
		Java: { icon: 'Jv', color: '#ed8b00' },
		'C++': { icon: 'C+', color: '#00599c' },
		C: { icon: 'C', color: '#555555' },
		Shell: { icon: 'Sh', color: '#89e051' },
		HTML: { icon: '<>', color: '#e34c26' },
		CSS: { icon: '#', color: '#563d7c' },
		Vue: { icon: 'V', color: '#42b883' },
		Svelte: { icon: 'Sv', color: '#ff3e00' }
	};

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
			<div class="repos-grid">
				{#each [1, 2, 3, 4] as _}
					<div class="repo-card skeleton-card">
						<Skeleton width="70%" height="1rem" />
						<Skeleton width="100%" height="0.85rem" />
						<Skeleton width="85%" height="0.85rem" />
						<Skeleton width="4rem" height="0.8rem" />
					</div>
				{/each}
			</div>
		{:else if repos.length}
			<div class="repos-grid">
				{#each repos as repo}
					<a href={addUTM(`https://github.com/${repo.author}/${repo.name}`, { content: 'opensource' })} class="repo-card" target="_blank" rel="noopener">
						<h3><span class="author">{repo.author}/</span><span class="repo-name">{repo.name}</span></h3>
						<p class="desc">{repo.description || 'No description'}</p>
						{#if repo.language}
							<div class="meta">
								<span class="lang" style="--lang-color: {langIcons[repo.language]?.color || 'var(--subtext)'}">
									<span class="lang-icon">{langIcons[repo.language]?.icon || repo.language.slice(0, 2)}</span>
									<span class="lang-name">{repo.language}</span>
								</span>
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
		padding: 1rem 2rem 2rem;
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

	.repo-card:hover:not(.skeleton-card) {
		background-color: var(--surface1);
		transform: translateY(-2px);
	}

	.skeleton-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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

	.lang {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.lang-icon {
		display: none;
	}

	@media (max-width: 480px) {
		.opensource {
			padding: 1rem;
		}

		h2 {
			font-size: 1.25rem;
			margin-bottom: 1.5rem;
		}

		.repos-grid {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}

		.repo-card {
			padding: 1rem;
		}

		h3 {
			font-size: 0.9rem;
		}

		.author {
			display: none;
		}

		.desc {
			font-size: 0.8rem;
		}

		.lang {
			font-size: 0.7rem;
		}
	}
</style>
