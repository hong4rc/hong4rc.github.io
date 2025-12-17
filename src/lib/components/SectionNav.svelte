<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	interface Section {
		id: string;
		label: string;
	}

	const sections: Section[] = [
		{ id: 'hero', label: 'Home' },
		{ id: 'tech-stack', label: 'Tech' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'experience', label: 'Exp' },
		{ id: 'opensource', label: 'OSS' },
		{ id: 'tools', label: 'Tools' },
		{ id: 'github-stats', label: 'GitHub' },
		{ id: 'contact', label: 'Contact' },
		{ id: 'availability', label: 'Status' },
		{ id: 'guestbook', label: 'Guest' }
	];

	let currentSection = $state('hero');
	let progress = $state(0);

	function updateCurrentSection() {
		const scrollY = window.scrollY + window.innerHeight / 3;
		const docHeight = document.body.scrollHeight - window.innerHeight;
		progress = Math.min((window.scrollY / docHeight) * 100, 100);

		for (let i = sections.length - 1; i >= 0; i--) {
			const el = document.querySelector(`.${sections[i].id}`);
			if (el && (el as HTMLElement).offsetTop <= scrollY) {
				currentSection = sections[i].id;
				return;
			}
		}
		currentSection = 'hero';
	}

	function scrollTo(id: string) {
		const element = document.querySelector(`.${id}`);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', updateCurrentSection);
			updateCurrentSection();
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', updateCurrentSection);
		}
	});
</script>

<nav class="section-nav">
	<div class="progress-line">
		<div class="progress-fill" style="height: {progress}%"></div>
	</div>
	<ul>
		{#each sections as section}
			<li>
				<button
					class="nav-item"
					class:active={currentSection === section.id}
					onclick={() => scrollTo(section.id)}
					title={section.label}
				>
					<span class="dot"></span>
					<span class="label">{section.label}</span>
				</button>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.section-nav {
		position: fixed;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		z-index: 40;
		display: flex;
		gap: 0.5rem;
	}

	.progress-line {
		width: 2px;
		background-color: var(--surface0);
		border-radius: 1px;
		position: relative;
		overflow: hidden;
	}

	.progress-fill {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background-color: var(--accent);
		transition: height 0.1s ease-out;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--subtext);
		font-family: 'Fira Code', monospace;
		font-size: 0.65rem;
		transition: color 0.2s;
	}

	.nav-item:hover {
		color: var(--text);
	}

	.nav-item.active {
		color: var(--accent);
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: var(--surface1);
		transition: background-color 0.2s, transform 0.2s;
	}

	.nav-item:hover .dot {
		background-color: var(--surface2);
		transform: scale(1.2);
	}

	.nav-item.active .dot {
		background-color: var(--accent);
		transform: scale(1.3);
	}

	.label {
		opacity: 0;
		transform: translateX(-5px);
		transition: opacity 0.2s, transform 0.2s;
		white-space: nowrap;
	}

	.section-nav:hover .label {
		opacity: 1;
		transform: translateX(0);
	}

	.nav-item.active .label {
		opacity: 1;
		transform: translateX(0);
	}

	@media (max-width: 768px) {
		.section-nav {
			display: none;
		}
	}
</style>
