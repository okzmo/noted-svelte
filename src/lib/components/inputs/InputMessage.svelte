<script lang="ts">
	import { createMutation, getQueryClientContext } from '@tanstack/svelte-query';
	import { steps, selection, title, name, show, config, creationError } from '../../stores.js';
	import { CreateACard } from '../../services/create-card.js';
	import { captureScreenshot } from '$lib/utils/capture-screenshot.js';

	let { inputMessage = $bindable() }: { inputMessage: HTMLTextAreaElement | undefined } = $props();

	const client = getQueryClientContext();
	const createCard = createMutation({
		mutationKey: ['create-card'],
		mutationFn: async () => {
			const selectionCoords = {
				x: $selection.x,
				y: $selection.y,
				width: $selection.width,
				height: $selection.height
			};
			steps.set('creating');

			const res = await CreateACard({
				config: $config,
				card_title: $title,
				card_description: inputMessage!.value,
				selectionCoords,
				name: $name
			});
			return res;
		},
		onError: (error) => {
			console.log(error);
			creationError.set(true);
			setTimeout(() => {
				creationError.set(false);
				steps.set('zone');
				selection.set({ xStart: 0, yStart: 0, x: 0, y: 0, width: 0, height: 0 });
			}, 1800);
		},
		onSuccess: () => {
			console.log('success');
			show.set(false);
			selection.set({ xStart: 0, yStart: 0, x: 0, y: 0, width: 0, height: 0 });
			steps.set('zone');
			client.invalidateQueries({ queryKey: ['notion-cards'] });
		}
	});

	function send(e: KeyboardEvent) {
		if (!inputMessage) return;
		if (!inputMessage.value) return;

		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			// $createCard.mutate();
			captureScreenshot();
		}
	}

	$effect(() => {
		inputMessage?.addEventListener('keydown', send);
	});
</script>

<textarea bind:this={inputMessage} class="input" placeholder="Your message..."></textarea>

<style>
	.input {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding-block: 0;
		margin-block: 0;
		border: none;
		outline: none;
		background: transparent;
		color: #fff;
		font-family: sans-serif;
		font-size: 14px;
		padding: 16px 18px;
		z-index: 10;
		resize: none;
		scroll-padding-block: 16px;
	}

	.input::-webkit-scrollbar {
		display: none;
	}

	.input::placeholder {
		color: rgba(255, 255, 255, 0.2);
	}
</style>
