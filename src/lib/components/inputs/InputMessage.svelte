<script lang="ts">
	import { steps } from '../../stores.js';

	let inputMessage: HTMLTextAreaElement | undefined = $state();

	function send(e: KeyboardEvent) {
		if (!inputMessage) return;

		if (e.key === 'Enter' && !e.shiftKey) {
			steps.set('creating');
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
