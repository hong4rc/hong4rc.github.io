<script lang="ts">
	import { config } from '$lib/config';
</script>

<section class="contact">
	<h2>Contact</h2>
	<div class="links">
		<a href="mailto:{config.contact.email}" class="link">
			<span class="icon">@</span>
			<span>Email</span>
		</a>
		<a href={config.contact.github} target="_blank" rel="noopener" class="link">
			<span class="icon">gh</span>
			<span>GitHub</span>
		</a>
		<a href={config.contact.linkedin} target="_blank" rel="noopener" class="link">
			<span class="icon">in</span>
			<span>LinkedIn</span>
		</a>
	</div>
</section>

<style>
	.contact {
		padding: 4rem 2rem;
		text-align: center;
		background-color: var(--mantle);
	}

	h2 {
		font-size: 1.5rem;
		color: var(--text);
		margin-bottom: 2rem;
	}

	.links {
		display: flex;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background-color: var(--surface0);
		border-radius: 4px;
		color: var(--subtext);
		transition: all 0.2s ease;
	}

	.link:hover {
		background-color: var(--surface1);
		color: var(--accent);
	}

	.icon {
		font-weight: 700;
		font-size: 0.85rem;
		color: var(--secondary);
	}
</style>
