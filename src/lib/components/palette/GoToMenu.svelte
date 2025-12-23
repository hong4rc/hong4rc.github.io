<script lang="ts">
	import { scrollTo } from '$lib/keybindings/navigation';

	interface Page {
		key: string;
		label: string;
		action: () => void;
	}

	const pages: Page[] = [
		{ key: 'h', label: 'Home', action: () => scrollTo('page-hero') },
		{ key: 'e', label: 'Experience', action: () => scrollTo('page-experience') },
		{ key: 't', label: 'Tech & OSS', action: () => scrollTo('page-tech') },
		{ key: 'l', label: 'Tools & Fun', action: () => scrollTo('page-tools') },
		{ key: 'c', label: 'Contact', action: () => scrollTo('page-contact') },
		{ key: 'b', label: 'Blog', action: () => (window.location.href = '/blog') }
	];

	let { onCommand }: { onCommand: (page: Page) => void } = $props();
</script>

<div class="which-key go-to">
	<div class="which-key-header">
		<kbd>g</kbd> + key
	</div>
	<div class="which-key-grid">
		<div class="which-key-group">
			<span class="group-title">Go to</span>
			<div class="which-key-item"><kbd>g</kbd><span>Top</span></div>
			{#each pages as page}
				<button class="which-key-item" onclick={() => onCommand(page)}>
					<kbd>{page.key}</kbd>
					<span>{page.label}</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.which-key {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		background-color: var(--mantle);
		border: 1px solid var(--surface0);
		border-radius: 8px;
		padding: 0.75rem;
		z-index: 1000;
		font-size: 0.8rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.which-key-header {
		color: var(--subtext);
		margin-bottom: 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--surface0);
	}

	.which-key-grid {
		display: flex;
		gap: 1.5rem;
	}

	.which-key-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.group-title {
		color: var(--accent);
		font-size: 0.7rem;
		text-transform: uppercase;
		margin-bottom: 0.25rem;
	}

	.which-key-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text);
		background: none;
		border: none;
		padding: 0.2rem 0;
		cursor: pointer;
		transition: color 0.2s;
		font-family: 'Fira Code', monospace;
		font-size: 0.8rem;
		text-align: left;
	}

	.which-key-item:hover {
		color: var(--accent);
	}

	.which-key-item kbd {
		min-width: 1.2rem;
		text-align: center;
		padding: 0.1rem 0.3rem;
		background-color: var(--surface0);
		border-radius: 3px;
		color: var(--text);
		font-size: 0.7rem;
	}
</style>
