<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error-page">
	<h1>{$page.status}</h1>
	<p class="message">
		{#if $page.status === 404}
			Page not found. Maybe it went for coffee?
		{:else}
			{$page.error?.message ?? 'Something went wrong'}
		{/if}
	</p>
	<a href="/" class="home-link">← Back to home</a>
</div>

<style>
	.error-page {
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 2rem;
	}

	h1 {
		font-size: clamp(4rem, 15vw, 8rem);
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.message {
		font-size: 1.2rem;
		color: var(--subtext);
		margin-bottom: 2rem;
	}

	.home-link {
		padding: 0.75rem 1.5rem;
		background-color: var(--surface0);
		border-radius: 8px;
		color: var(--text);
		transition: all 0.2s ease;
	}

	.home-link:hover {
		background-color: var(--surface1);
		color: var(--accent);
	}
</style>
