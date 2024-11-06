<script lang="ts">
	import InputName from './inputs/InputName.svelte';
	import InputMessage from './inputs/InputMessage.svelte';
	import { name, steps, inboxOpen, creationError } from '../stores.js';
	import InputTitle from './inputs/InputTitle.svelte';
	import { spring } from 'svelte/motion';
	import { crossfade, fly } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';

	let inputTitle: HTMLInputElement | undefined = $state();
	let inputMessage: HTMLTextAreaElement | undefined = $state();

	const [send, receive] = crossfade({
		duration: 150,
		easing: quartOut,
		fallback() {
			return {
				duration: 150,
				easing: quartOut,
				css: (t, u) => `
              opacity: ${t};
              transform: translateY(${u * 20}px);
              position: absolute;
              z-index: ${t < 0.5 ? -1 : 1};
        `
			};
		}
	});

	function updateSpringWithConfig(newValues: { width: number; height: number }, step: string) {
		switch (step) {
			case 'title':
				dimensions.stiffness = 0.05;
				dimensions.damping = 0.18;
				break;
			case 'creating':
				dimensions.stiffness = 0.02;
				dimensions.damping = 0.15;
				break;
			default:
				dimensions.stiffness = 0.02;
				dimensions.damping = 0.15;
		}

		dimensions.set(newValues);
	}

	const dimensions = spring({
		width: 250,
		height: 48
	});

	$effect(() => {
		switch ($steps) {
			case 'title':
				updateSpringWithConfig({ width: 350, height: 48 }, 'title');
				inputTitle?.focus();
				break;
			case 'description':
				updateSpringWithConfig({ width: 450, height: 350 }, 'description');
				setTimeout(() => {
					inputMessage?.focus();
				}, 50);
				break;
			case 'creating':
				updateSpringWithConfig({ width: 250, height: 48 }, 'creating');
				break;
			default:
				updateSpringWithConfig({ width: 250, height: 48 }, 'default');
				break;
		}
	});
</script>

<div
	transition:fly={{ y: 100, duration: 100 }}
	class="wrapper"
	style="width: {$dimensions.width}px; height: {$dimensions.height}px; border: {$creationError
		? '1px solid rgba(255, 56, 56, 1)'
		: '1px solid rgba(0, 0, 0, 1)'}"
	data-ignore-screenshot
>
	{#if $steps === 'name' && $name === ''}
		<div in:receive={{ key: 'name' }} out:send={{ key: 'name' }}>
			<InputName />
		</div>
	{:else if $steps === 'pin'}
		<div in:receive={{ key: 'pin' }} out:send={{ key: 'pin' }}>
			<p class="standalone-message">Pin the issue</p>
		</div>
	{:else if $steps === 'title'}
		<div in:receive={{ key: 'title' }} out:send={{ key: 'title' }}>
			<InputTitle bind:inputTitle />
		</div>
	{:else if $steps === 'description'}
		<div in:receive={{ key: 'description' }} out:send={{ key: 'description' }}>
			<InputMessage bind:inputMessage />
		</div>
	{:else}
		<div in:receive={{ key: 'creating' }} out:send={{ key: 'creating' }}>
			<p class="standalone-message" class:error={$creationError}>
				{#if $creationError}
					Creation failed! Try again.
				{:else}
					Creating card...
				{/if}
			</p>
		</div>
	{/if}

	<button class="inbox-button" aria-label="Open inbox" onclick={() => inboxOpen.set(!$inboxOpen)}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			class="inbox-button-icon"
		>
			<path
				fill="currentColor"
				d="M1 12c0-5.185 0-7.778 1.61-9.39C4.223 1 6.816 1 12 1s7.778 0 9.39 1.61C23 4.223 23 6.816 23 12s0 7.778-1.61 9.39C19.777 23 17.184 23 12 23s-7.778 0-9.39-1.61C1 19.777 1 17.184 1 12"
				opacity=".5"
			/>
			<path
				fill="currentColor"
				d="M2.61 21.389c1.612 1.61 4.205 1.61 9.39 1.61s7.778 0 9.39-1.61c1.492-1.493 1.601-3.829 1.61-8.29h-3.476c-.996 0-1.494 0-1.931.202c-.438.201-.762.58-1.41 1.335l-.666.777c-.648.756-.972 1.134-1.41 1.335s-.935.202-1.93.202h-.353c-.996 0-1.494 0-1.931-.202c-.438-.2-.762-.579-1.41-1.335l-.666-.777c-.648-.756-.972-1.134-1.41-1.335s-.935-.201-1.93-.201H1c.008 4.46.118 6.796 1.61 8.289"
			/>
		</svg>
	</button>
</div>

<style>
	* {
		box-sizing: border-box;
	}

	.wrapper {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 20px;
		color: rgba(255, 255, 255, 0.4);
		background-color: #121215;
		font-family: sans-serif;
		z-index: 9999;
		border-radius: 12px;
		font-size: 14px;
		box-shadow:
			inset 0px 1px 0px #2d2d33,
			inset 0px 0px 0px 1px #202024;
		transition: border 75ms ease-out;
	}

	.wrapper > div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.standalone-message {
		text-wrap: nowrap;
		position: absolute;
		margin: 0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: rgba(255, 255, 255, 0.4);
		font-size: 14px;
	}

	.standalone-message.error {
		color: rgba(255, 56, 56, 1);
	}

	.inbox-button {
		z-index: 10;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		height: 48px;
		width: 48px;
		right: calc(-48px - 10px);
		bottom: -1px;
		background-color: #121215;
		color: #fff;
		border: 1px solid rgba(0, 0, 0, 1);
		box-shadow:
			inset 0px 1px 0px #2d2d33,
			inset 0px 0px 0px 1px #202024;
		border-radius: 12px;
		transition:
			box-shadow 75ms ease-out,
			background-color 75ms ease-out;
	}

	.inbox-button:hover {
		background-color: #18181b !important;
		border: 1px solid rgba(0, 0, 0, 1);
		box-shadow:
			inset 0px 1px 0px #36363c,
			inset 0px 0px 0px 1px #27272b;
		cursor: pointer;
	}

	.inbox-button:focus {
		border: 1px solid rgba(0, 0, 0, 1);
		background-color: #18181b !important;
		outline: none !important;
		box-shadow:
			inset 0px 1px 0px #36363c,
			inset 0px 0px 0px 1px #27272b;
	}

	.inbox-button:focus-visible {
		border: 1px solid rgba(0, 0, 0, 1);
		background-color: #18181b !important;
		outline: none !important;
		box-shadow:
			inset 0px 1px 0px #36363c,
			inset 0px 0px 0px 1px #27272b;
	}

	.inbox-button-icon {
		color: rgba(255, 255, 255, 0.3);
		transition: color 75ms ease-out;
	}

	.inbox-button:hover .inbox-button-icon {
		color: rgba(255, 255, 255, 0.5);
	}
</style>
