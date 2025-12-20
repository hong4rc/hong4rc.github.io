export function reveal(node: HTMLElement, options: { delay?: number; stagger?: boolean } = {}) {
	const { delay = 0, stagger = false } = options;

	node.style.opacity = '0';
	node.style.transform = 'translateY(20px)';
	node.style.transition = `opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;

	// Stagger children animations
	if (stagger) {
		const children = node.querySelectorAll(':scope > *');
		children.forEach((child, i) => {
			const el = child as HTMLElement;
			el.style.opacity = '0';
			el.style.transform = 'translateY(15px)';
			el.style.transition = `opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${delay + i * 80}ms, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${delay + i * 80}ms`;
		});
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translateY(0)';

					if (stagger) {
						const children = node.querySelectorAll(':scope > *');
						children.forEach((child) => {
							const el = child as HTMLElement;
							el.style.opacity = '1';
							el.style.transform = 'translateY(0)';
						});
					}

					observer.unobserve(node);
				}
			});
		},
		{ threshold: 0.1 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
