<script lang="ts">
	import { onMount } from 'svelte';
	import SelectionOverlay from './components/SelectionOverlay.svelte';
	import Wrapper from './components/Wrapper.svelte';
	import { name, steps, selection } from './stores.js';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';

	let showNoted = $state(false);
	let firstKey = $state<string | null>(null);

	function handleKeydown(e: KeyboardEvent) {
		if (!['Alt', 'Escape'].includes(e.key)) return;

		if (e.key === 'Escape') {
			if ($name === '') return;
			if ($selection.width > 0 && $selection.height > 0) {
				selection.set({ xStart: 0, yStart: 0, x: 0, y: 0, width: 0, height: 0 });
				steps.set('zone');
			} else {
				showNoted = false;
			}
			return;
		}

		if (!firstKey && !showNoted) {
			firstKey = e.key;
		} else if (firstKey && !showNoted && e.altKey) {
			showNoted = true;
			firstKey = null;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);

		const savedName = localStorage.getItem('ntd-name');
		if (savedName) {
			name.set(savedName);
			steps.set('zone');
		}
	});

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	{#if showNoted}
		<SelectionOverlay />
		<Wrapper />
	{/if}
</QueryClientProvider>

<style>
	:global(*) {
		box-sizing: border-box;
	}
</style>
