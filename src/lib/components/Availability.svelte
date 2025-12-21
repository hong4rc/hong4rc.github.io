<script lang="ts">
	import { config } from '$lib/config';
</script>

{#if config.features.showAvailability && config.availability}
	<div class="availability">
		<div class="banner" class:available={config.availability.available}>
			<span class="status-dot"></span>
			<span class="status-text">{config.availability.status}</span>
		</div>
		{#if config.availability.message}
			<p class="message">{config.availability.message}</p>
		{/if}
	</div>
{/if}

<style>
	.availability {
		text-align: center;
		padding: 1rem 0;
	}

	.banner {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: var(--surface0);
		border-radius: 20px;
		margin-bottom: 0.5rem;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--subtext);
		animation: pulse 2s ease-in-out infinite;
	}

	.banner.available .status-dot {
		background-color: #22c55e;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	.status-text {
		font-size: 0.9rem;
		color: var(--text);
	}

	.message {
		font-size: 0.85rem;
		color: var(--subtext);
	}
</style>
