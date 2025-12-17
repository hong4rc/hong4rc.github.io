declare global {
	namespace App {}

	interface Window {
		dataLayer: unknown[];
	}
}

export {};
