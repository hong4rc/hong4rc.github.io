export function reveal(node: HTMLElement, options: { delay?: number } = {}) {
	const { delay = 0 } = options;

	node.style.opacity = '0';
	node.style.transform = 'translateY(20px)';
	node.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translateY(0)';
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
