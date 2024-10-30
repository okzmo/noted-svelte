<script>
	import Noted from '$lib/Noted.svelte';
</script>

<Noted apiKey={import.meta.env.VITE_NOTION_KEY} boardId={import.meta.env.VITE_BOARD_ID} />

<style>
	:global(body) {
		background-color: #121215;
	}
</style>
