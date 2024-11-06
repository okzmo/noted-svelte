<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { pinning } from '$lib/stores.js';

	let cursor: HTMLDivElement | null = $state(null);

	function handleMouseMove(e: MouseEvent) {
		if (!cursor) return;

		cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 5}px)`;
	}

	onMount(() => {
		document.addEventListener('mousemove', handleMouseMove);
	});

	onDestroy(() => {});

	$effect(() => {
		if (!cursor) return;
		if ($pinning) {
			cursor.style.opacity = '1';
		} else if (!$pinning) {
			cursor.style.opacity = '0';
		}
	});
</script>

<div class="pin" out:fade={{ duration: 75 }} bind:this={cursor}></div>

<style>
	.pin {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 24px;
		height: 24px;
		background-color: rgba(0, 0, 0, 1);
		z-index: 9998;
		border-radius: 25px 25px 25px 5px;
		pointer-events: none;
		user-select: none;
		border: 0.5px solid #000000;
		box-shadow: inset 0px 0px 0px 1px #fafafa;
	}
</style>
