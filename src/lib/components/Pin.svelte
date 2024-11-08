<script lang="ts">
	import { show, COLORS } from '$lib/stores.js';
	import { updatePosition } from '$lib/utils/update-position.js';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		id: string;
		pathToTarget: string;
		clickX: number;
		clickY: number;
		author: string;
		status: {
			name: string;
			color: string;
		};
	}

	let { id, pathToTarget, clickX, clickY, author, status }: Props = $props();
	let coordinates = $state({ x: 0, y: 0 });

	function handleResize(targetEl: HTMLElement) {
		coordinates = updatePosition(targetEl, clickX, clickY);
	}

	$effect(() => {
		if (!pathToTarget) return;

		const targetEl = document.querySelector(pathToTarget) as HTMLElement;
		if (!targetEl) return;

		coordinates = updatePosition(targetEl, clickX, clickY);
		window.addEventListener('resize', () => handleResize(targetEl));

		return () => {
			window.removeEventListener('resize', () => handleResize(targetEl));
		};
	});
</script>

<div
	{id}
	class="ntd-pin"
	class:pinning={$show}
	style="top: {coordinates.y}px; left: {coordinates.x}px; background-color: {COLORS[status.color]}"
	out:fade={{ duration: 75 }}
>
	{author.slice(0, 1)}
</div>

<style>
	:global(.ntd-pin) {
		opacity: 0;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		color: white;
		top: 0;
		left: 0;
		width: 24px;
		height: 24px;
		background-color: rgba(0, 0, 0, 1);
		z-index: 9998;
		border-radius: 5px 25px 25px 25px;
		user-select: none;
		border: 0.5px solid #000000;
		box-shadow: inset 0px 0px 0px 1px #fafafa;
		transition: transform 75ms ease-out;
	}

	:global(.ntd-pin:hover) {
		cursor: pointer;
		transform: scale(1.1);
	}

	:global(.ntd-pin.pinning) {
		opacity: 1;
	}
</style>
