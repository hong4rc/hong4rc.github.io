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
	import Availability from '$lib/components/Availability.svelte';
	import Guestbook from '$lib/components/Guestbook.svelte';
	import Blog from '$lib/components/Blog.svelte';
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
	<Availability />
	<Guestbook />
	<Blog />
</main>

<footer>
	<p>&copy; {new Date().getFullYear()} Hong4rc</p>
</footer>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
	}

	footer {
		text-align: center;
		padding: 2rem;
		color: var(--surface2);
		font-size: 0.85rem;
	}
</style>
