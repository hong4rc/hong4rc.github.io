<script lang="ts">
	import { config, themes } from '$lib/config';
	import { theme } from '$lib/stores/theme';
	import { scrollTo } from '$lib/keybindings/navigation';

	interface Command {
		key: string;
		label: string;
		action: () => void;
	}

	const pages: Command[] = [
		{ key: 'h', label: 'Home', action: () => scrollTo('page-hero') },
		{ key: 'e', label: 'Experience', action: () => scrollTo('page-experience') },
		{ key: 't', label: 'Tech & OSS', action: () => scrollTo('page-tech') },
		{ key: 'l', label: 'Tools & Fun', action: () => scrollTo('page-tools') },
		{ key: 'c', label: 'Contact', action: () => scrollTo('page-contact') },
		{ key: 'b', label: 'Blog', action: () => (window.location.href = '/blog') }
	];

	const themeKeys: Command[] = themes.map((t, i) => ({
		key: String(i + 1),
		label: t.name,
		action: () => theme.set(t.id)
	}));

	let { onCommand }: { onCommand: (cmd: Command) => void } = $props();
</script>

<div class="which-key">
	<div class="which-key-header">
		<kbd>SPC</kbd> + key
	</div>
	<div class="which-key-grid">
		<div class="which-key-group">
			<span class="group-title">Pages</span>
			{#each pages as cmd}
				<button
					class="which-key-item"
					onclick={() => onCommand(cmd)}
					onkeydown={(e) => e.key === cmd.key && onCommand(cmd)}
				>
					<kbd>{cmd.key}</kbd>
					<span>{cmd.label}</span>
				</button>
			{/each}
		</div>
		<div class="which-key-group">
			<span class="group-title">Theme</span>
			{#each themeKeys as cmd}
				<button
					class="which-key-item"
					onclick={() => onCommand(cmd)}
					onkeydown={(e) => e.key === cmd.key && onCommand(cmd)}
				>
					<kbd>{cmd.key}</kbd>
					<span>{cmd.label}</span>
				</button>
			{/each}
		</div>
		<div class="which-key-group">
			<span class="group-title">Links</span>
			<button
				class="which-key-item"
				onclick={() =>
					onCommand({
						key: 'G',
						label: 'GitHub',
						action: () => window.open(config.contact.github, '_blank')
					})}
			>
				<kbd>G</kbd><span>GitHub</span>
			</button>
			<button
				class="which-key-item"
				onclick={() =>
					onCommand({
						key: 'L',
						label: 'LinkedIn',
						action: () => window.open(config.contact.linkedin, '_blank')
					})}
			>
				<kbd>L</kbd><span>LinkedIn</span>
			</button>
			<button
				class="which-key-item"
				onclick={() =>
					onCommand({
						key: 'E',
						label: 'Email',
						action: () => (window.location.href = `mailto:${config.contact.email}`)
					})}
			>
				<kbd>E</kbd><span>Email</span>
			</button>
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
