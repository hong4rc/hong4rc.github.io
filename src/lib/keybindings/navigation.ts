/**
 * Navigation utilities for page scrolling and movement
 */

const pageOrder = ['page-hero', 'page-experience', 'page-tech', 'page-tools', 'page-contact'];

export function scrollTo(className: string) {
	const element = document.querySelector(`.${className}`);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
}

export function getCurrentPageIndex(): number {
	const scrollY = window.scrollY + window.innerHeight / 2;
	for (let i = pageOrder.length - 1; i >= 0; i--) {
		const el = document.querySelector(`.${pageOrder[i]}`);
		if (el && (el as HTMLElement).offsetTop <= scrollY) {
			return i;
		}
	}
	return 0;
}

export function goToNextPage() {
	const current = getCurrentPageIndex();
	const next = Math.min(current + 1, pageOrder.length - 1);
	scrollTo(pageOrder[next]);
}

export function goToPrevPage() {
	const current = getCurrentPageIndex();
	if (current === 0) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	} else {
		scrollTo(pageOrder[current - 1]);
	}
}

export function goToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function goToBottom() {
	window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

export function halfPageDown() {
	window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
}

export function halfPageUp() {
	window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' });
}

export function fullPageDown() {
	window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
}

export function fullPageUp() {
	window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
}

export function centerCurrentPage() {
	const current = getCurrentPageIndex();
	const el = document.querySelector(`.${pageOrder[current]}`);
	if (el) {
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}

export { pageOrder };
