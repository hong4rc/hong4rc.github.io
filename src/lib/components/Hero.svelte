<script lang="ts">
	import { config } from '$lib/config';
	import { onMount } from 'svelte';

	// Split name to highlight "4"
	const nameParts = config.name.match(/^(.*?)(4)(.*)$/);

	let bioText = $state('');
	const fullBio = config.bio;

	onMount(() => {
		let i = 0;
		const interval = setInterval(() => {
			if (i < fullBio.length) {
				bioText = fullBio.slice(0, i + 1);
				i++;
			} else {
				clearInterval(interval);
			}
		}, 50);

		return () => clearInterval(interval);
	});
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
	<p class="bio">{bioText}<span class="cursor">|</span></p>
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

	.cursor {
		color: var(--accent);
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	.experience {
		font-size: 0.9rem;
		color: var(--surface2);
	}
</style>
