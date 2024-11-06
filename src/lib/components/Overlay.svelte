<script lang="ts">
	import { steps, pin, pinning } from '$lib/stores.js';
	import { onMount, onDestroy } from 'svelte';

	let overlay: HTMLDivElement | undefined = $state();

	function handleMouseClick(e: MouseEvent) {
		if (e.button !== 0) return;

		pin.set({ x: e.clientX - 10, y: e.clientY - 5, scroll: window.scrollY, pinned: true });
		pinning.set(false);
		steps.set('title');
	}

	onMount(() => {
		overlay!.addEventListener('click', handleMouseClick);
	});

	onDestroy(() => {
		overlay!.removeEventListener('click', handleMouseClick);
	});
</script>

<div class="pin-overlay" bind:this={overlay} style={`cursor: ${$pinning ? 'none' : 'auto'}`}></div>

<style>
	.pin-overlay {
		position: fixed;
		user-select: none;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9998;
	}
</style>
