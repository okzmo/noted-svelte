<script lang="ts">
	import { show, name, steps, inboxOpen, config, pinning, pin } from '../stores.js';
	import Wrapper from './Wrapper.svelte';
	import Inbox from './Inbox.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createQuery } from '@tanstack/svelte-query';
	import { GetCards } from '../services/get-cards.js';
	import Pin from './Pin.svelte';
	import PinCursor from './PinCursor.svelte';
	import Overlay from './Overlay.svelte';

	let firstKey = $state<string | null>(null);

	function handleKeydown(e: KeyboardEvent) {
		if (!['Alt', 'Escape'].includes(e.key)) return;

		if (e.key === 'Escape') {
			if ($pin.pinned) {
				pin.set({ clickX: 0, clickY: 0, scroll: 0, pathToTarget: '', pinned: false });
				steps.set('pin');
				pinning.set(true);
			} else {
				show.set(false);
				pinning.set(false);
				document.body.classList.remove('ntd-pin-mode');
			}
			return;
		}

		if (!firstKey && !$show) {
			firstKey = e.key;
		} else if (firstKey && !$show && e.altKey) {
			show.set(true);
			pinning.set(true);
			document.body.classList.add('ntd-pin-mode');
			firstKey = null;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);

		const savedName = localStorage.getItem('ntd-name');
		if (savedName) {
			name.set(savedName);
			steps.set('pin');
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
	<Overlay />
	<Wrapper />
	{#if $pin.pinned}
		<Pin
			id="pin-[{$pin.clickX}-{$pin.clickY}]"
			clickX={$pin.clickX}
			clickY={$pin.clickY}
			pathToTarget={$pin.pathToTarget}
			author={$name}
			status={{ name: 'Not Started', color: 'red' }}
		/>
	{/if}
	{#if $allCards.data}
		{#each $allCards.data as card}
			{#if card.pinCoords}
				<Pin
					id="pin-[{card.pinCoords.clickX}-{card.pinCoords.clickY}]"
					clickX={card.pinCoords.clickX}
					clickY={card.pinCoords.clickY}
					pathToTarget={card.pinCoords.pathToTarget}
					author={card.author}
					status={card.status}
				/>
			{/if}
		{/each}
	{/if}
{/if}

<PinCursor />

<style>
	:global(body.ntd-pin-mode) {
		cursor: none;
	}
</style>
