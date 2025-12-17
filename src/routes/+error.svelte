<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	const GRID_SIZE = 15;
	const CELL_SIZE = 20;

	type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
	type Point = { x: number; y: number };

	let snake: Point[] = [{ x: 7, y: 7 }];
	let food: Point = { x: 10, y: 10 };
	let direction: Direction = 'RIGHT';
	let nextDirection: Direction = 'RIGHT';
	let score = 0;
	let gameOver = false;
	let gameStarted = false;
	let intervalId: number | null = null;

	function spawnFood(): Point {
		let newFood: Point;
		do {
			newFood = {
				x: Math.floor(Math.random() * GRID_SIZE),
				y: Math.floor(Math.random() * GRID_SIZE)
			};
		} while (snake.some((s) => s.x === newFood.x && s.y === newFood.y));
		return newFood;
	}

	function move() {
		if (gameOver) return;

		direction = nextDirection;
		const head = { ...snake[0] };

		switch (direction) {
			case 'UP':
				head.y--;
				break;
			case 'DOWN':
				head.y++;
				break;
			case 'LEFT':
				head.x--;
				break;
			case 'RIGHT':
				head.x++;
				break;
		}

		if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
			gameOver = true;
			return;
		}

		if (snake.some((s) => s.x === head.x && s.y === head.y)) {
			gameOver = true;
			return;
		}

		snake = [head, ...snake];

		if (head.x === food.x && head.y === food.y) {
			score++;
			food = spawnFood();
		} else {
			snake = snake.slice(0, -1);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!gameStarted && $page.status === 404) {
			startGame();
			return;
		}

		if (gameOver) {
			resetGame();
			return;
		}

		switch (e.key) {
			case 'ArrowUp':
			case 'w':
				if (direction !== 'DOWN') nextDirection = 'UP';
				break;
			case 'ArrowDown':
			case 's':
				if (direction !== 'UP') nextDirection = 'DOWN';
				break;
			case 'ArrowLeft':
			case 'a':
				if (direction !== 'RIGHT') nextDirection = 'LEFT';
				break;
			case 'ArrowRight':
			case 'd':
				if (direction !== 'LEFT') nextDirection = 'RIGHT';
				break;
		}
	}

	function startGame() {
		gameStarted = true;
		gameOver = false;
		snake = [{ x: 7, y: 7 }];
		food = spawnFood();
		direction = 'RIGHT';
		nextDirection = 'RIGHT';
		score = 0;
		intervalId = setInterval(move, 150) as unknown as number;
	}

	function resetGame() {
		if (intervalId) clearInterval(intervalId);
		startGame();
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeydown);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeydown);
			if (intervalId) clearInterval(intervalId);
		}
	});
</script>

<div class="error-page">
	<h1>{$page.status}</h1>
	<p class="message">
		{#if $page.status === 404}
			Page not found. Play a game while you're here?
		{:else}
			{$page.error?.message ?? 'Something went wrong'}
		{/if}
	</p>

	{#if $page.status === 404}
		<div class="game-container">
			{#if !gameStarted}
				<div class="game-overlay">
					<p>Press any key to play Snake</p>
				</div>
			{:else if gameOver}
				<div class="game-overlay">
					<p>Game Over!</p>
					<p class="final-score">Score: {score}</p>
					<p class="restart">Press any key to restart</p>
				</div>
			{/if}
			<div class="game-grid" style="--size: {GRID_SIZE}; --cell: {CELL_SIZE}px">
				{#each Array(GRID_SIZE * GRID_SIZE) as _, i}
					{@const x = i % GRID_SIZE}
					{@const y = Math.floor(i / GRID_SIZE)}
					{@const isSnake = snake.some((s) => s.x === x && s.y === y)}
					{@const isHead = snake[0]?.x === x && snake[0]?.y === y}
					{@const isFood = food.x === x && food.y === y}
					<div
						class="cell"
						class:snake={isSnake}
						class:head={isHead}
						class:food={isFood}
					></div>
				{/each}
			</div>
			{#if gameStarted}
				<p class="score">Score: {score}</p>
			{/if}
		</div>
	{/if}

	<a href="/" class="home-link">← Back to home</a>
</div>

<style>
	.error-page {
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 2rem;
	}

	h1 {
		font-size: clamp(3rem, 10vw, 5rem);
		color: var(--accent);
		margin-bottom: 0.5rem;
	}

	.message {
		font-size: 1rem;
		color: var(--subtext);
		margin-bottom: 1.5rem;
	}

	.game-container {
		position: relative;
		margin-bottom: 1.5rem;
	}

	.game-overlay {
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: var(--text);
		z-index: 10;
		border-radius: 8px;
	}

	.final-score {
		font-size: 1.5rem;
		color: var(--accent);
		margin: 0.5rem 0;
	}

	.restart {
		font-size: 0.8rem;
		color: var(--subtext);
	}

	.game-grid {
		display: grid;
		grid-template-columns: repeat(var(--size), var(--cell));
		grid-template-rows: repeat(var(--size), var(--cell));
		gap: 1px;
		background-color: var(--surface0);
		padding: 4px;
		border-radius: 8px;
	}

	.cell {
		width: var(--cell);
		height: var(--cell);
		background-color: var(--mantle);
		border-radius: 2px;
	}

	.cell.snake {
		background-color: var(--accent);
	}

	.cell.head {
		background-color: var(--secondary);
	}

	.cell.food {
		background-color: var(--text);
		border-radius: 50%;
	}

	.score {
		margin-top: 0.75rem;
		color: var(--subtext);
		font-size: 0.9rem;
	}

	.home-link {
		padding: 0.75rem 1.5rem;
		background-color: var(--surface0);
		border-radius: 8px;
		color: var(--text);
		transition: all 0.2s ease;
	}

	.home-link:hover {
		background-color: var(--surface1);
		color: var(--accent);
	}
</style>
