<script>
	import { fade, fly, slide, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { elasticOut } from 'svelte/easing';

	let showFade = $state(true);
	let showFly = $state(true);
	let showSlide = $state(true);
	let showScale = $state(true);

	/** @type {string[]} */
	let items = $state(['Apples', 'Bananas', 'Cherries', 'Dates', 'Elderberries']);
	let newItem = $state('');

	function addItem() {
		const v = newItem.trim();
		if (!v) return;
		items = [v, ...items];
		newItem = '';
	}

	function removeItem(i) {
		items = items.filter((_, idx) => idx !== i);
	}

	function shuffle() {
		items = [...items].sort(() => Math.random() - 0.5);
	}
</script>

<svelte:head>
	<title>Transitions — SvelteKit SPA</title>
</svelte:head>

<h1>✨ Transitions</h1>
<p>Built-in Svelte transitions (<code>fade</code>, <code>fly</code>, <code>slide</code>, <code>scale</code>) and <code>flip</code> animations.</p>

<div class="grid">
	<!-- fade -->
	<div class="card">
		<div class="card-header">
			<h2>fade</h2>
			<button class="btn-toggle" onclick={() => (showFade = !showFade)}>{showFade ? 'Hide' : 'Show'}</button>
		</div>
		{#if showFade}
			<div class="demo-box" transition:fade={{ duration: 400 }}>
				Smooth opacity transition
			</div>
		{/if}
	</div>

	<!-- fly -->
	<div class="card">
		<div class="card-header">
			<h2>fly</h2>
			<button class="btn-toggle" onclick={() => (showFly = !showFly)}>{showFly ? 'Hide' : 'Show'}</button>
		</div>
		{#if showFly}
			<div class="demo-box" transition:fly={{ y: 40, duration: 400 }}>
				Flies in from below
			</div>
		{/if}
	</div>

	<!-- slide -->
	<div class="card">
		<div class="card-header">
			<h2>slide</h2>
			<button class="btn-toggle" onclick={() => (showSlide = !showSlide)}>{showSlide ? 'Hide' : 'Show'}</button>
		</div>
		{#if showSlide}
			<div class="demo-box" transition:slide={{ duration: 350 }}>
				Collapses vertically
			</div>
		{/if}
	</div>

	<!-- scale + elastic easing -->
	<div class="card">
		<div class="card-header">
			<h2>scale + easing</h2>
			<button class="btn-toggle" onclick={() => (showScale = !showScale)}>{showScale ? 'Hide' : 'Show'}</button>
		</div>
		{#if showScale}
			<div class="demo-box" transition:scale={{ duration: 500, easing: elasticOut }}>
				Elastic pop!
			</div>
		{/if}
	</div>
</div>

<!-- FLIP list -->
<section class="card flip-section">
	<h2>flip — animated list reorder</h2>
	<p>Add items or shuffle — positions animate smoothly using the <code>flip</code> animation.</p>

	<form class="add-row" onsubmit={(e) => { e.preventDefault(); addItem(); }}>
		<input type="text" bind:value={newItem} placeholder="Add an item" />
		<button type="submit" class="btn-add">Add</button>
		<button type="button" class="btn-shuffle" onclick={shuffle}>🔀 Shuffle</button>
	</form>

	<ul>
		{#each items as item, i (item)}
			<li animate:flip={{ duration: 350, easing: elasticOut }}>
				<span>{item}</span>
				<button class="btn-remove" onclick={() => removeItem(i)} aria-label="Remove">✕</button>
			</li>
		{/each}
	</ul>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1.25rem;
		margin-top: 1.75rem;
	}

	.card {
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 12px;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.demo-box {
		background: linear-gradient(135deg, #4338ca, #7c3aed);
		border-radius: 8px;
		padding: 1rem;
		text-align: center;
		font-weight: 600;
		color: #e0e7ff;
		font-size: 0.9rem;
	}

	.btn-toggle {
		background: #334155;
		color: #e2e8f0;
		padding: 0.3rem 0.75rem;
		font-size: 0.82rem;
	}

	.flip-section {
		margin-top: 1.5rem;
	}

	.add-row {
		display: flex;
		gap: 0.65rem;
		flex-wrap: wrap;
	}

	.add-row input {
		flex: 1;
		min-width: 10rem;
	}

	.btn-add {
		background: #4f46e5;
		color: #fff;
	}

	.btn-shuffle {
		background: #334155;
		color: #e2e8f0;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #0f172a;
		border-radius: 8px;
		padding: 0.6rem 0.9rem;
		font-size: 0.9rem;
	}

	.btn-remove {
		background: transparent;
		color: #64748b;
		padding: 0.2rem 0.4rem;
		font-size: 0.8rem;
	}

	.btn-remove:hover {
		color: #f87171;
	}

	code {
		font-family: monospace;
		font-size: 0.85em;
		background: #0f172a;
		padding: 0.1em 0.35em;
		border-radius: 4px;
		color: #a5b4fc;
	}
</style>
