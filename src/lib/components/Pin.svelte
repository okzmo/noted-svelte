<script lang="ts">
	import { show } from '$lib/stores.js';
	import { fade } from 'svelte/transition';

	interface Props {
		id: string;
		x?: number;
		y?: number;
	}

	let { id, x, y }: Props = $props();
</script>

<div
	{id}
	class="pin"
	class:pinning={$show}
	style="transform: translate({x}px, {y}px);"
	out:fade={{ duration: 75 }}
></div>

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

	.pin.pinning {
		opacity: 1;
	}
</style>
