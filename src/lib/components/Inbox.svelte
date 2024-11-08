<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Card } from '../services/get-cards.js';
	import { COLORS } from '../stores.js';

	let { cards, loading }: { cards: Card[] | undefined; loading: boolean } = $props();
</script>

<div class="inbox" transition:fly={{ x: 100, duration: 150 }}>
	{#if loading}
		Loading data...
	{:else if cards && cards.length > 0}
		{#each cards as card}
			<div class="card">
				<span>{card.title}</span>
				<div class="cardMetadata">
					<div class="author">
						<span class="authorBg" style="background-color: #fff"></span>
						<p class="authorText">{card.author}</p>
					</div>
					<div class="status">
						<span class="statusBg" style="background-color: {COLORS[card.status.color]}"></span>
						<p class="statusText">{card.status.name}</p>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		No data found
	{/if}
</div>

<style>
	.inbox {
		position: fixed;
		display: flex;
		z-index: 9999;
		flex-direction: column;
		gap: 10px;
		padding: 10px 12px;
		top: 20px;
		right: 20px;
		height: calc(100% - 40px);
		width: 300px;
		border-radius: 12px;
		background-color: #121215;
		color: #fff;
		border: 1px solid rgba(0, 0, 0, 1);
		font-size: 14px;
		font-family: sans-serif;
		box-shadow:
			inset 0px 1px 0px #2d2d33,
			inset 0px 0px 0px 1px #202024;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 1px;
		text-align: left;
		background-color: #18181b;
		border-radius: 6px;
		padding: 8px 12px;
		font-size: 14px;
	}

	.cardMetadata {
		display: flex;
		margin-top: 10px;
		gap: 10px;
	}

	.status,
	.author {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2px 8px;
		width: fit-content;
		position: relative;
	}

	.statusText,
	.authorText {
		margin: 0;
	}

	.statusBg,
	.authorBg {
		opacity: 0.4;
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		border-radius: 4px;
	}
</style>
