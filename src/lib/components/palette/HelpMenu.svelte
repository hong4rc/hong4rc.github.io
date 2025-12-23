<script lang="ts">
	// Help menu showing all available keybindings
</script>

<div class="which-key full-help">
	<div class="which-key-header">
		<kbd>?</kbd> - Keybindings
	</div>
	<div class="which-key-grid">
		<div class="which-key-group">
			<span class="group-title">Navigation</span>
			<div class="which-key-item"><kbd>/</kbd><span>Search</span></div>
			<div class="which-key-item"><kbd>j/w</kbd><span>Next</span></div>
			<div class="which-key-item"><kbd>k/b</kbd><span>Prev</span></div>
			<div class="which-key-item"><kbd>gg</kbd><span>Top</span></div>
			<div class="which-key-item"><kbd>G</kbd><span>Bottom</span></div>
			<div class="which-key-item"><kbd>0/^</kbd><span>First</span></div>
			<div class="which-key-item"><kbd>$</kbd><span>Last</span></div>
		</div>
		<div class="which-key-group">
			<span class="group-title">Scroll</span>
			<div class="which-key-item"><kbd>^d</kbd><span>Half ↓</span></div>
			<div class="which-key-item"><kbd>^u</kbd><span>Half ↑</span></div>
			<div class="which-key-item"><kbd>^f</kbd><span>Full ↓</span></div>
			<div class="which-key-item"><kbd>^b</kbd><span>Full ↑</span></div>
			<div class="which-key-item"><kbd>Tab</kbd><span>Next</span></div>
			<div class="which-key-item"><kbd>S-Tab</kbd><span>Prev</span></div>
		</div>
		<div class="which-key-group">
			<span class="group-title">Other</span>
			<div class="which-key-item"><kbd>SPC</kbd><span>Leader</span></div>
			<div class="which-key-item"><kbd>g+key</kbd><span>Go to</span></div>
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
