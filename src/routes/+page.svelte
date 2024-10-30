<script>
	import Noted from '$lib/Noted.svelte';
	import Counter from './Counter.svelte';
	import '../app.css';
</script>

<div class="app">
	<main>
		<section>
			<h1>
				to your new<br />SvelteKit app
			</h1>

			<h2>
				try editing <strong>src/routes/+page.svelte</strong>
			</h2>
		</section>
	</main>
</div>
<Noted apiKey={import.meta.env.VITE_NOTION_KEY} boardId={import.meta.env.VITE_BOARD_ID} />

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.app {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		box-sizing: border-box;
	}
</style>
