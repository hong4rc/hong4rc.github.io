<script lang="ts">
	import { config } from '$lib/config';

	// Split name to highlight "4"
	const nameParts = config.name.match(/^(.*?)(4)(.*)$/);
</script>

<section class="hero">
	<h1 class="name">
		{#if nameParts}
			<span>{nameParts[1]}</span><span class="highlight">{nameParts[2]}</span><span>{nameParts[3]}</span>
		{:else}
			{config.name}
		{/if}
	</h1>
	<p class="title">{config.title}</p>
	<p class="bio">{config.bio}</p>
	<p class="experience">{config.experience} years of experience</p>
</section>

<style>
	.hero {
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 2rem;
	}

	.name {
		font-size: clamp(2.5rem, 8vw, 4rem);
		font-weight: 700;
		color: var(--text);
		margin-bottom: 0.5rem;
	}

	.highlight {
		color: var(--accent);
	}

	.title {
		font-size: clamp(1.2rem, 4vw, 1.5rem);
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.bio {
		font-size: clamp(1rem, 3vw, 1.2rem);
		color: var(--subtext);
		margin-bottom: 0.5rem;
		white-space: nowrap;
	}

	.experience {
		font-size: 0.9rem;
		color: var(--surface2);
	}
</style>
