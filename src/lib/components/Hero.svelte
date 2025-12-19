<script lang="ts">
	import { config } from '$lib/config';
	import { onMount } from 'svelte';

	// Split name to highlight "4"
	const nameParts = config.name.match(/^(.*?)(4)(.*)$/);

	const devQuotes = [
		"it works on my machine ¯\\_(ツ)_/¯",
		"// TODO: fix this later (written 3 years ago)",
		"git commit -m 'fix' for the 47th time",
		"99 bugs in the code, fix one, 127 bugs in the code",
		"it's not a bug, it's an undocumented feature",
		"works perfectly, no clue why",
		"deleted node_modules, fixed everything",
		"copy from stackoverflow, mass as own",
		"console.log('here') debugging master",
		"spent 6 hours on a typo"
	];

	let bioText = $state('');
	let quote = $state('');
	const fullBio = config.bio;

	onMount(() => {
		// Random quote
		quote = devQuotes[Math.floor(Math.random() * devQuotes.length)];

		// Typewriter effect
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
	<nav class="top-nav">
		<h1 class="name">
			{#if nameParts}
				<span>{nameParts[1]}</span><span class="highlight">{nameParts[2]}</span><span>{nameParts[3]}</span>
			{:else}
				{config.name}
			{/if}
		</h1>
		<a href="/blog" class="nav-link">Blog</a>
	</nav>
	<p class="title">{config.title}</p>
	<p class="bio">{bioText}<span class="cursor">|</span></p>
	<p class="experience">{config.experience} years of experience</p>
	{#if quote}
		<p class="quote">"{quote}"</p>
	{/if}
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

	.top-nav {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.nav-link {
		font-size: 1rem;
		color: var(--subtext);
		text-decoration: none;
		padding: 0.4rem 0.8rem;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.nav-link:hover {
		color: var(--accent);
		background-color: var(--surface0);
	}

	.name {
		font-size: clamp(2.5rem, 8vw, 4rem);
		font-weight: 700;
		color: var(--text);
		margin-bottom: 0;
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

	.quote {
		margin-top: 2rem;
		font-size: 0.85rem;
		color: var(--surface2);
		font-style: italic;
		opacity: 0.7;
	}
</style>
