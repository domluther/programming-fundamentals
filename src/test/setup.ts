import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

// Cleanup after each test
afterEach(() => {
	cleanup();
	// Also clear localStorage after each test
	localStorage.clear();
});

// Clear before each test too
beforeEach(() => {
	localStorage.clear();
});

// Mock localStorage with actual storage
class LocalStorageMock {
	private store: Record<string, string>;

	constructor() {
		this.store = {};
	}

	clear() {
		// Delete all keys instead of creating a new object
		for (const key of Object.keys(this.store)) {
			delete this.store[key];
		}
	}

	getItem(key: string) {
		return this.store[key] || null;
	}

	setItem(key: string, value: string) {
		this.store[key] = String(value);
	}

	removeItem(key: string) {
		delete this.store[key];
	}

	get length() {
		return Object.keys(this.store).length;
	}

	key(index: number) {
		const keys = Object.keys(this.store);
		return keys[index] || null;
	}
}

global.localStorage = new LocalStorageMock() as unknown as Storage;

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	}),
});
