<script lang="ts">
	import { config } from '$lib/config';
</script>

{#if config.features.showAvailability && config.availability}
	<section class="availability">
		<div class="banner" class:available={config.availability.available}>
			<span class="status-dot"></span>
			<span class="status-text">{config.availability.status}</span>
		</div>
		{#if config.availability.message}
			<p class="message">{config.availability.message}</p>
		{/if}
	</section>
{/if}

<style>
	.availability {
		padding: 2rem;
		text-align: center;
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
	}

	.banner.available .status-dot {
		background-color: #22c55e;
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
