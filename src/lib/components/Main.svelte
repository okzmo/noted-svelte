<script lang="ts">
	import { show, name, steps, inboxOpen, config } from '../stores.js';
	import Wrapper from './Wrapper.svelte';
	import Inbox from './Inbox.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createQuery } from '@tanstack/svelte-query';
	import { GetCards } from '../services/get-cards.js';

	let firstKey = $state<string | null>(null);
	function handleKeydown(e: KeyboardEvent) {
		if (!['Alt', 'Escape'].includes(e.key)) return;

		if (e.key === 'Escape') {
			show.set(false);
			return;
		}

		if (!firstKey && !$show) {
			firstKey = e.key;
		} else if (firstKey && !$show && e.altKey) {
			show.set(true);
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

	const allCards = createQuery({
		queryKey: ['notion-cards'],
		queryFn: async () => {
			const data = await GetCards({ config: $config });
			return data;
		},
		enabled: true
	});
</script>

{#if $show}
	<div transition:fade={{ duration: 150 }} style="z-index: 9999; position: fixed">
		{#if $inboxOpen}
			<Inbox cards={$allCards.data} loading={$allCards.isLoading} />
		{/if}
	</div>
	<Wrapper />
{/if}
