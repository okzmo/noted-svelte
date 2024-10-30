<script lang="ts">
	import { steps, title } from '../../stores.js';

	let { inputTitle = $bindable() }: { inputTitle: HTMLInputElement | undefined } = $props();

	function chooseTitle(e: KeyboardEvent) {
		if (!inputTitle) return;

		if (e.key === 'Enter') {
			title.set(inputTitle.value);
			steps.set('description');
		}
	}

	$effect(() => {
		inputTitle?.addEventListener('keydown', chooseTitle);
	});
</script>

<input bind:this={inputTitle} class="input" type="text" placeholder="Your title..." />

<style>
	.input {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 48px;
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
	}

	.input::placeholder {
		color: rgba(255, 255, 255, 0.2);
	}
</style>
