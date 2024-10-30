<script lang="ts">
	import { onMount } from 'svelte';
	import { config } from './stores.js';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';
	import Main from './components/Main.svelte';

	let { apiKey, boardId }: { apiKey: string; boardId: string } = $props();

	onMount(() => {
		config.set({
			apiKey,
			boardId
		});
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
	<Main />
</QueryClientProvider>

<style>
	:global(*) {
		box-sizing: border-box;
	}
</style>
