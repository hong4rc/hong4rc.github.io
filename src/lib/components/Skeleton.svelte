<script lang="ts">
	let { width = '100%', height = '1rem', rounded = false }: {
		width?: string;
		height?: string;
		rounded?: boolean
	} = $props();
</script>

<div
	class="skeleton"
	class:rounded
	style="width: {width}; height: {height}"
></div>

<style>
	.skeleton {
		background: linear-gradient(
			90deg,
			var(--surface0) 25%,
			var(--surface1) 50%,
			var(--surface0) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 4px;
	}

	.skeleton.rounded {
		border-radius: 50%;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
</style>
