import { writable } from 'svelte/store';

export const name = writable('');
export const title = writable('');
export const steps = writable('name');
export const show = writable(false);
export const inboxOpen = writable(false);
export const creationError = writable(false);
export const config = writable({
	apiKey: '',
	boardId: ''
});
