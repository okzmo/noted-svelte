import { writable } from 'svelte/store';
import type { Card } from './services/get-cards.js';

export const name = writable('');
export const title = writable('');
export const steps = writable('name');
export const show = writable(false);
export const pinning = writable(false);
export const pin = writable({ x: 0, y: 0, scroll: 0, pinned: false });
export const cards = writable<Card[]>([]);
export const inboxOpen = writable(false);
export const creationError = writable(false);
export const config = writable({
	apiKey: '',
	boardId: ''
});
