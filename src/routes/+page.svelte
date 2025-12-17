<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import TechStack from '$lib/components/TechStack.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import OpenSource from '$lib/components/OpenSource.svelte';
	import Tools from '$lib/components/Tools.svelte';
	import GitHubStats from '$lib/components/GitHubStats.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import AvailabilityGuestbook from '$lib/components/AvailabilityGuestbook.svelte';
	import Blog from '$lib/components/Blog.svelte';
	import TechFooter from '$lib/components/TechFooter.svelte';
</script>

<SEO />

<main>
	<Hero />
	<TechStack />
	<Skills />
	<Experience />
	<OpenSource />
	<Tools />
	<GitHubStats />
	<Projects />
	<Contact />
	<AvailabilityGuestbook />
	<Blog />
</main>

<TechFooter />

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
