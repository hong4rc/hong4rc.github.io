<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	interface Page {
		id: string;
		label: string;
		key: string;
	}

	const pages: Page[] = [
		{ id: 'page-hero', label: 'Home', key: 'h' },
		{ id: 'page-experience', label: 'Exp', key: 'e' },
		{ id: 'page-tech', label: 'Tech', key: 't' },
		{ id: 'page-tools', label: 'Tools', key: 'l' },
		{ id: 'page-contact', label: 'Contact', key: 'c' }
	];

	let currentPage = $state('page-hero');
	let currentIndex = $state(0);

	function updateCurrentPage() {
		const scrollY = window.scrollY + window.innerHeight / 2;

		for (let i = pages.length - 1; i >= 0; i--) {
			const el = document.querySelector(`.${pages[i].id}`);
			if (el && (el as HTMLElement).offsetTop <= scrollY) {
				currentPage = pages[i].id;
				currentIndex = i;
				return;
			}
		}
		currentPage = 'page-hero';
		currentIndex = 0;
	}

	function scrollToPage(id: string) {
		const element = document.querySelector(`.${id}`);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	export function goToPage(index: number) {
		if (index >= 0 && index < pages.length) {
			scrollToPage(pages[index].id);
		}
	}

	export function nextPage() {
		goToPage(Math.min(currentIndex + 1, pages.length - 1));
	}

	export function prevPage() {
		goToPage(Math.max(currentIndex - 1, 0));
	}

	export function firstPage() {
		goToPage(0);
	}

	export function lastPage() {
		goToPage(pages.length - 1);
	}

	export { pages, currentIndex };

	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', updateCurrentPage);
			updateCurrentPage();
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', updateCurrentPage);
		}
	});
</script>

<nav class="section-nav">
	<div class="progress-bar">
		{#each pages as _, i}
			<div class="progress-segment" class:active={i === currentIndex}></div>
		{/each}
	</div>
	<ul>
		{#each pages as page, i}
			<li>
				<button
					class="nav-item"
					class:active={currentPage === page.id}
					onclick={() => scrollToPage(page.id)}
					title="{page.label} ({page.key})"
				>
					<span class="dot"></span>
					<span class="label">{page.label}</span>
				</button>
			</li>
		{/each}
	</ul>
	<div class="page-indicator">{currentIndex + 1}/{pages.length}</div>
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

	.progress-bar {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.progress-segment {
		width: 2px;
		flex: 1;
		background-color: var(--surface0);
		border-radius: 1px;
		transition: background-color 0.2s;
	}

	.progress-segment.active {
		background-color: var(--accent);
	}

	.page-indicator {
		font-size: 0.6rem;
		color: var(--subtext);
		text-align: center;
		margin-top: 0.5rem;
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
