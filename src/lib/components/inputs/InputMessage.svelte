<script lang="ts">
	import { createMutation, getQueryClientContext } from '@tanstack/svelte-query';
	import { steps, title, name, show, config, creationError } from '../../stores.js';
	import { CreateACard } from '../../services/create-card.js';

	let { inputMessage = $bindable() }: { inputMessage: HTMLTextAreaElement | undefined } = $props();

	const client = getQueryClientContext();
	const createCard = createMutation({
		mutationKey: ['create-card'],
		mutationFn: async () => {
			steps.set('creating');

			const res = await CreateACard({
				config: $config,
				card_title: $title,
				card_description: inputMessage!.value,
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
			}, 1800);
		},
		onSuccess: () => {
			console.log('success');
			show.set(false);
			steps.set('zone');
			client.invalidateQueries({ queryKey: ['notion-cards'] });
		}
	});

	function send(e: KeyboardEvent) {
		if (!inputMessage) return;
		if (!inputMessage.value) return;

		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			$createCard.mutate();
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
