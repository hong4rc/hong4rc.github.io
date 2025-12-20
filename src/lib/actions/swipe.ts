export function swipe(node: HTMLElement, options: { onLeft?: () => void; onRight?: () => void } = {}) {
	let startX = 0;
	let startY = 0;
	let startTime = 0;

	const minSwipeDistance = 50;
	const maxSwipeTime = 300;
	const maxVerticalDistance = 100;

	function handleTouchStart(e: TouchEvent) {
		startX = e.touches[0].clientX;
		startY = e.touches[0].clientY;
		startTime = Date.now();
	}

	function handleTouchEnd(e: TouchEvent) {
		const endX = e.changedTouches[0].clientX;
		const endY = e.changedTouches[0].clientY;
		const endTime = Date.now();

		const deltaX = endX - startX;
		const deltaY = endY - startY;
		const deltaTime = endTime - startTime;

		// Check if it's a valid horizontal swipe
		if (
			Math.abs(deltaX) > minSwipeDistance &&
			Math.abs(deltaY) < maxVerticalDistance &&
			deltaTime < maxSwipeTime
		) {
			if (deltaX > 0 && options.onRight) {
				options.onRight();
			} else if (deltaX < 0 && options.onLeft) {
				options.onLeft();
			}
		}
	}

	node.addEventListener('touchstart', handleTouchStart, { passive: true });
	node.addEventListener('touchend', handleTouchEnd, { passive: true });

	return {
		destroy() {
			node.removeEventListener('touchstart', handleTouchStart);
			node.removeEventListener('touchend', handleTouchEnd);
		},
		update(newOptions: { onLeft?: () => void; onRight?: () => void }) {
			options = newOptions;
		}
	};
}
