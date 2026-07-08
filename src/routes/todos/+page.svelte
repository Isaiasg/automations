<script>
	/** @type {'all'|'active'|'done'} */
	let filter = $state('all');
	let input = $state('');

	/** @type {{ id: number; text: string; done: boolean }[]} */
	let todos = $state(loadTodos());

	// Persist to localStorage whenever todos change
	$effect(() => {
		localStorage.setItem('svelte-todos', JSON.stringify(todos));
	});

	let filtered = $derived(
		filter === 'all' ? todos : filter === 'active' ? todos.filter((t) => !t.done) : todos.filter((t) => t.done)
	);

	let remaining = $derived(todos.filter((t) => !t.done).length);

	function loadTodos() {
		if (typeof localStorage === 'undefined') return [];
		try {
			return JSON.parse(localStorage.getItem('svelte-todos') ?? '[]');
		} catch {
			return [];
		}
	}

	function addTodo() {
		const text = input.trim();
		if (!text) return;
		todos = [...todos, { id: Date.now(), text, done: false }];
		input = '';
	}

	function toggle(id) {
		todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
	}

	function remove(id) {
		todos = todos.filter((t) => t.id !== id);
	}

	function clearDone() {
		todos = todos.filter((t) => !t.done);
	}
</script>

<svelte:head>
	<title>Todos — SvelteKit SPA</title>
</svelte:head>

<h1>✅ Todos</h1>
<p>Reactive list with filtering and <code>localStorage</code> persistence — data survives a page refresh.</p>

<div class="card">
	<form class="add-row" onsubmit={(e) => { e.preventDefault(); addTodo(); }}>
		<input type="text" bind:value={input} placeholder="What needs doing?" />
		<button type="submit" class="btn-add">Add</button>
	</form>

	<div class="filters">
		{#each ['all', 'active', 'done'] as f}
			<button class="filter-btn" class:active={filter === f} onclick={() => (filter = f)}>
				{f.charAt(0).toUpperCase() + f.slice(1)}
			</button>
		{/each}
	</div>

	{#if filtered.length === 0}
		<p class="empty">Nothing here — {filter === 'done' ? 'complete some tasks!' : 'add a task above!'}</p>
	{:else}
		<ul>
			{#each filtered as todo (todo.id)}
				<li class:done={todo.done}>
					<input type="checkbox" checked={todo.done} onchange={() => toggle(todo.id)} />
					<span>{todo.text}</span>
					<button class="btn-remove" onclick={() => remove(todo.id)} aria-label="Remove">✕</button>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="footer">
		<span>{remaining} task{remaining !== 1 ? 's' : ''} left</span>
		{#if todos.some((t) => t.done)}
			<button class="btn-clear" onclick={clearDone}>Clear done</button>
		{/if}
	</div>
</div>

<style>
	.card {
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 12px;
		padding: 1.5rem;
		margin-top: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.add-row {
		display: flex;
		gap: 0.75rem;
	}

	.add-row input {
		flex: 1;
	}

	.btn-add {
		background: #4f46e5;
		color: #fff;
	}

	.filters {
		display: flex;
		gap: 0.5rem;
	}

	.filter-btn {
		background: #334155;
		color: #94a3b8;
		padding: 0.35rem 0.85rem;
	}

	.filter-btn.active {
		background: #4f46e5;
		color: #fff;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: #0f172a;
		border-radius: 8px;
		padding: 0.65rem 0.9rem;
		transition: opacity 0.2s;
	}

	li.done span {
		text-decoration: line-through;
		opacity: 0.45;
	}

	li span {
		flex: 1;
	}

	input[type='checkbox'] {
		width: 1.1rem;
		height: 1.1rem;
		accent-color: #4f46e5;
		cursor: pointer;
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

	.empty {
		text-align: center;
		font-size: 0.9rem;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.85rem;
		color: #64748b;
	}

	.btn-clear {
		background: transparent;
		color: #f87171;
		padding: 0.25rem 0.5rem;
		font-size: 0.85rem;
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
