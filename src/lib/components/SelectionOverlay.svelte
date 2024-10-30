<script lang="ts">
	import { name, selection, steps } from '../stores.js';

	let zone: HTMLDivElement | undefined = $state();
	let selecting = $state(false);

	function onMouseDown(e: MouseEvent) {
		if (e.button !== 0) return;
		selection.update((state) => {
			state.xStart = e.clientX;
			state.yStart = e.clientY;
			state.x = e.clientX;
			state.y = e.clientY;
			state.width = 0;
			state.height = 0;
			return state;
		});
		selecting = true;
	}

	function onMouseMove(e: MouseEvent) {
		if (selecting) {
			selection.update((state) => {
				state.x = Math.min(state.xStart, e.clientX);
				state.y = Math.min(state.yStart, e.clientY);
				state.width = Math.abs(e.clientX - state.xStart);
				state.height = Math.abs(e.clientY - state.yStart);
				return state;
			});
		}
	}

	function onMouseUp(e: MouseEvent) {
		if (e.button !== 0) return;
		selecting = false;
		steps.set('title');
	}

	$effect(() => {
		if ($name !== '') {
			zone?.addEventListener('mousedown', onMouseDown);
			zone?.addEventListener('mousemove', onMouseMove);
			zone?.addEventListener('mouseup', onMouseUp);
		}
	});
</script>

<div class="backdrop-zone" bind:this={zone} data-ignore-screenshot></div>
<div
	id="selectionRect"
	class="selectionRect"
	class:selected={$selection.width > 0 && $selection.height > 0}
	style="top: {$selection.y}px; left: {$selection.x}px; width: {$selection.width}px; height: {$selection.height}px;"
	data-ignore-screenshot
></div>

<style>
	.backdrop-zone {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}

	.selectionRect {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 0px;
		height: 0px;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.1);
		box-shadow:
			0px 0px 16px rgba(0, 0, 0, 0.25),
			0px 0px 0px 9999px rgba(0, 0, 0, 0.65),
			inset 0px 0px 0px 1px rgba(250, 250, 250, 0.25);
		transition:
			box-shadow 250ms ease-out,
			background-color 250ms ease-out;
	}

	.selectionRect.selected {
		background-color: rgba(255, 255, 255, 0.05);
		box-shadow:
			0px 0px 16px rgba(0, 0, 0, 0.25),
			0px 0px 0px 9999px rgba(0, 0, 0, 0.85),
			inset 0px 0px 0px 1px rgba(250, 250, 250, 0.25);
	}
</style>
