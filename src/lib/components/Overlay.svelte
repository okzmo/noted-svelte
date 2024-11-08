<script lang="ts">
	import { steps, pin, pinning } from '$lib/stores.js';
	import { onMount, onDestroy } from 'svelte';

	let overlay: HTMLDivElement | undefined = $state();

	function getElementPath(element) {
		const path = [];
		while (element.parentElement) {
			let selector = element.tagName.toLowerCase();
			const siblings = Array.from(element.parentElement.children);
			if (siblings.length > 1) {
				const index = siblings.indexOf(element) + 1;
				selector += `:nth-child(${index})`;
			}
			path.unshift(selector);
			element = element.parentElement;
		}
		return path.join(' > ');
	}

	function handleMouseClick(e: MouseEvent) {
		if (e.button !== 0) return;

		const overlayElements = document.elementsFromPoint(e.clientX, e.clientY)[0];
		const targetEl = document.elementsFromPoint(e.clientX, e.clientY)[1];
		if (
			overlayElements?.classList.contains('wrapper') ||
			overlayElements?.classList.contains('inbox-button') ||
			overlayElements?.classList.contains('wrapper-content') ||
			overlayElements?.classList.contains('ntd-pin')
		)
			return;

		const path = getElementPath(targetEl);
		const rect = targetEl.getBoundingClientRect();

		pin.set({
			pathToTarget: path,
			clickX: e.clientX - rect.left,
			clickY: e.clientY - rect.top,
			scroll: window.scrollY,
			pinned: true
		});
		pinning.set(false);
		steps.set('title');
	}

	onMount(() => {
		window.addEventListener('click', handleMouseClick);
	});

	onDestroy(() => {
		window.removeEventListener('click', handleMouseClick);
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
		z-index: 9997;
	}
</style>
