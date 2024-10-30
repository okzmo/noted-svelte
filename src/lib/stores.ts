import { writable } from 'svelte/store';

export const name = writable('');
export const title = writable('');
export const steps = writable('name');
export const selection = writable({ xStart: 0, yStart: 0, x: 0, y: 0, width: 0, height: 0 });
export const show = writable(false);
export const inboxOpen = writable(false);
export const creationError = writable(false);
export const config = writable({
	apiKey: '',
	boardId: ''
});
