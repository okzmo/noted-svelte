<script lang="ts">
	import { name, steps } from '../../stores.js';

	let inputName: HTMLInputElement | undefined = $state();

	function chooseName(e: KeyboardEvent) {
		if (!inputName) return;

		if (e.key === 'Enter') {
			localStorage.setItem('ntd-name', inputName.value);
			name.set(inputName.value);
			steps.set('zone');
		}
	}

	$effect(() => {
		inputName?.addEventListener('keydown', chooseName);
	});
</script>

<input bind:this={inputName} class="input" type="text" placeholder="Your name..." />

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
	}

	.input::placeholder {
		color: rgba(255, 255, 255, 0.2);
	}
</style>
