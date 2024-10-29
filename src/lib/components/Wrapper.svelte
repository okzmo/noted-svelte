<script lang="ts">
	import InputName from './inputs/InputName.svelte';
	import InputMessage from './inputs/InputMessage.svelte';
	import { name, steps } from '../stores.js';
	import InputTitle from './inputs/InputTitle.svelte';
	import { spring } from 'svelte/motion';

	const dimensions = spring(
		{
			width: 250,
			height: 48
		},
		{
			stiffness: 0.035,
			damping: 0.18
		}
	);

	$effect(() => {
		switch ($steps) {
			case 'title':
				dimensions.set({
					width: 350,
					height: 48
				});
				break;
			case 'description':
				dimensions.set({
					width: 450,
					height: 300
				});
				break;
			default:
				dimensions.set({
					width: 250,
					height: 48
				});
				break;
		}
	});
</script>

<div class="wrapper" style="width: {$dimensions.width}px; height: {$dimensions.height}px">
	{#if $steps === 'name' && $name === ''}
		<InputName />
	{:else if $steps === 'zone'}
		Select a zone
	{:else if $steps === 'title'}
		<InputTitle />
	{:else if $steps === 'description'}
		<InputMessage />
	{:else}
		Creating card...
	{/if}
</div>

<style>
	* {
		box-sizing: border-box;
	}

	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 20px;
		color: rgba(255, 255, 255, 0.4);
		background-color: #121215;
		font-family: sans-serif;
		z-index: 9999;
		border-radius: 12px;
		border: 1px solid rgba(0, 0, 0, 1);
		font-size: 14px;
		box-shadow:
			inset 0px 1px 0px #2d2d33,
			inset 0px 0px 0px 1px #202024;
	}
</style>
