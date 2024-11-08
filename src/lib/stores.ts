import { writable } from 'svelte/store';
import type { Card } from './services/get-cards.js';

export const name = writable('');
export const title = writable('');
export const steps = writable('name');
export const show = writable(false);
export const pinning = writable(false);
export const pin = writable({
	pathToTarget: '',
	scroll: 0,
	pinned: false,
	clickX: 0,
	clickY: 0
});
export const cards = writable<Card[]>([]);
export const inboxOpen = writable(false);
export const creationError = writable(false);
export const config = writable({
	apiKey: '',
	boardId: ''
});

export const COLORS = {
	red: '#DC2626',
	yellow: '#fbbf24',
	green: '#16a34a',
	purple: '#6d28d9'
};
