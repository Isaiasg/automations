<svelte:head>
	<title>SvelteKit SPA — Home</title>
</svelte:head>

<h1>⚡ SvelteKit SPA Showcase</h1>
<p>A client-side-only SvelteKit app demonstrating useful Svelte 5 features.</p>

<div class="cards">
	<a href="/counter" class="card">
		<span class="icon">🔢</span>
		<h2>Counter</h2>
		<p>Svelte stores, <code>$state</code> runes, and derived values.</p>
	</a>

	<a href="/todos" class="card">
		<span class="icon">✅</span>
		<h2>Todos</h2>
		<p>Reactive lists, filtering, and <code>localStorage</code> persistence.</p>
	</a>

	<a href="/fetch" class="card">
		<span class="icon">🌐</span>
		<h2>Fetch</h2>
		<p>Async data loading, loading states, and error handling.</p>
	</a>

	<a href="/transitions" class="card">
		<span class="icon">✨</span>
		<h2>Transitions</h2>
		<p>Built-in Svelte transitions, animations, and motion effects.</p>
	</a>
</div>

<style>
	h1 {
		background: linear-gradient(135deg, #818cf8, #c084fc);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.75rem;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1.25rem;
		margin-top: 2.5rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 12px;
		padding: 1.5rem;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.2s, transform 0.15s;
	}

	.card:hover {
		border-color: #6366f1;
		transform: translateY(-3px);
	}

	.icon {
		font-size: 2rem;
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
