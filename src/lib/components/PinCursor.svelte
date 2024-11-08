<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { pinning } from '$lib/stores.js';

	let cursor: HTMLDivElement | null = $state(null);

	function handleMouseMove(e: MouseEvent) {
		if (!cursor) return;

		cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

		const target = e.target as HTMLElement;
		if (target.classList.contains('ntd-pin') || target.classList.contains('inbox-button')) {
			cursor.style.opacity = '0';
		} else if ($pinning) {
			cursor.style.opacity = '1';
		}
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
		position: fixed;
		top: 0;
		left: 0;
		width: 24px;
		height: 24px;
		background-color: rgba(0, 0, 0, 1);
		z-index: 9999;
		border-radius: 5px 25px 25px 25px;
		pointer-events: none;
		user-select: none;
		border: 0.5px solid #000000;
		box-shadow: inset 0px 0px 0px 1px #fafafa;
	}
</style>
