<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import TechStack from '$lib/components/TechStack.svelte';
	import FunFacts from '$lib/components/FunFacts.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import OpenSource from '$lib/components/OpenSource.svelte';
	import Tools from '$lib/components/Tools.svelte';
	import GitHubStats from '$lib/components/GitHubStats.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Availability from '$lib/components/Availability.svelte';
	import TechFooter from '$lib/components/TechFooter.svelte';
	import { swipe } from '$lib/actions/swipe';

	const pages = ['page-hero', 'page-experience', 'page-tech', 'page-tools', 'page-contact'];

	function getCurrentPageIndex(): number {
		const scrollY = window.scrollY + window.innerHeight / 2;
		for (let i = pages.length - 1; i >= 0; i--) {
			const el = document.querySelector(`.${pages[i]}`);
			if (el && (el as HTMLElement).offsetTop <= scrollY) {
				return i;
			}
		}
		return 0;
	}

	function scrollToPage(index: number) {
		if (index >= 0 && index < pages.length) {
			const el = document.querySelector(`.${pages[index]}`);
			if (el) el.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function handleSwipeLeft() {
		const current = getCurrentPageIndex();
		scrollToPage(Math.min(current + 1, pages.length - 1));
	}

	function handleSwipeRight() {
		const current = getCurrentPageIndex();
		scrollToPage(Math.max(current - 1, 0));
	}
</script>

<SEO />

<main use:swipe={{ onLeft: handleSwipeLeft, onRight: handleSwipeRight }}>
	<!-- Page 1: Hero -->
	<div class="page page-hero">
		<Hero />
	</div>

	<!-- Page 2: Experience -->
	<div class="page page-experience">
		<Experience />
	</div>

	<!-- Page 3: Tech Stack + Open Source -->
	<div class="page page-tech">
		<TechStack />
		<OpenSource />
	</div>

	<!-- Page 4: Tools + Fun Facts -->
	<div class="page page-tools">
		<Tools />
		<FunFacts />
	</div>

	<!-- Page 5: GitHub + Contact + Status -->
	<div class="page page-contact">
		<GitHubStats />
		<Contact />
		<Availability />
		<TechFooter />
	</div>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding-top: 4rem;
	}

	.page {
		padding: 2rem;
		scroll-margin-top: 3.5rem;
	}

	.page-hero {
		padding: 0;
	}

	.page-contact {
		padding-bottom: 0;
		min-height: auto;
		justify-content: flex-start;
	}

	@media (max-width: 480px) {
		main {
			padding-top: 3rem;
		}

		.page {
			padding: 1rem;
		}
	}
</style>
