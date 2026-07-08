<script>
	import { writable, derived } from 'svelte/store';

	// Svelte 5 runes: local reactive state
	let localCount = $state(0);
	let step = $state(1);
	let doubled = $derived(localCount * 2);
	let squared = $derived(localCount ** 2);

	// Svelte store (shared / observable pattern)
	const storeCount = writable(0);
	const storeDoubled = derived(storeCount, ($c) => $c * 2);

	function reset() {
		localCount = 0;
		storeCount.set(0);
	}
</script>

<svelte:head>
	<title>Counter — SvelteKit SPA</title>
</svelte:head>

<h1>🔢 Counter</h1>
<p>Demonstrates <code>$state</code> runes and Svelte stores side by side.</p>

<div class="sections">
	<!-- Runes section -->
	<section class="card">
		<h2>Svelte 5 Runes</h2>
		<p class="hint">State lives in the component using <code>$state</code> and <code>$derived</code>.</p>

		<div class="row">
			<label>Step <input type="number" bind:value={step} min="1" max="100" style="width:5rem" /></label>
		</div>

		<div class="display">{localCount}</div>

		<div class="row">
			<button class="btn-dec" onclick={() => (localCount -= step)}>−{step}</button>
			<button class="btn-inc" onclick={() => (localCount += step)}>+{step}</button>
		</div>

		<div class="derived-row">
			<span>× 2 = <strong>{doubled}</strong></span>
			<span>² = <strong>{squared}</strong></span>
		</div>
	</section>

	<!-- Store section -->
	<section class="card">
		<h2>Svelte Store</h2>
		<p class="hint">State lives in a <code>writable</code> store — shareable across components.</p>

		<div class="display">{$storeCount}</div>

		<div class="row">
			<button class="btn-dec" onclick={() => storeCount.update((n) => n - 1)}>−1</button>
			<button class="btn-inc" onclick={() => storeCount.update((n) => n + 1)}>+1</button>
		</div>

		<div class="derived-row">
			<span>× 2 = <strong>{$storeDoubled}</strong></span>
		</div>
	</section>
</div>

<button class="btn-reset" onclick={reset}>↺ Reset all</button>

<style>
	.sections {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 1.25rem;
		margin-top: 1.75rem;
	}

	.card {
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 12px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.hint {
		font-size: 0.85rem;
	}

	.display {
		font-size: 3.5rem;
		font-weight: 700;
		text-align: center;
		color: #a5b4fc;
		font-variant-numeric: tabular-nums;
	}

	.row {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		justify-content: center;
	}

	.derived-row {
		display: flex;
		justify-content: space-around;
		font-size: 0.9rem;
		color: #94a3b8;
	}

	strong {
		color: #e2e8f0;
	}

	.btn-inc {
		background: #4f46e5;
		color: #fff;
		min-width: 3.5rem;
	}

	.btn-dec {
		background: #374151;
		color: #e2e8f0;
		min-width: 3.5rem;
	}

	.btn-reset {
		margin-top: 1.5rem;
		background: #334155;
		color: #94a3b8;
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
