<script>
	// Public JSON API (no auth required)
	const API = 'https://jsonplaceholder.typicode.com';

	/** @type {'posts'|'users'|'todos'} */
	let resource = $state('posts');
	let limit = $state(5);

	/** @type {any[]} */
	let data = $state([]);
	let loading = $state(false);
	let error = $state('');

	async function fetchData() {
		loading = true;
		error = '';
		data = [];
		try {
			const res = await fetch(`${API}/${resource}?_limit=${limit}`);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			data = await res.json();
		} catch (err) {
			error = err instanceof Error ? err.message : String(err);
		} finally {
			loading = false;
		}
	}

	// Fetch on first load
	$effect(() => {
		fetchData();
	});

	const summaryKeys = {
		posts: ['id', 'title'],
		users: ['id', 'name', 'email'],
		todos: ['id', 'title', 'completed']
	};
</script>

<svelte:head>
	<title>Fetch — SvelteKit SPA</title>
</svelte:head>

<h1>🌐 Fetch</h1>
<p>Client-side data fetching from <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noreferrer">JSONPlaceholder</a> with loading and error states.</p>

<div class="controls">
	<label>
		Resource
		<select bind:value={resource}>
			<option value="posts">Posts</option>
			<option value="users">Users</option>
			<option value="todos">Todos</option>
		</select>
	</label>

	<label>
		Limit
		<input type="number" bind:value={limit} min="1" max="20" style="width:4.5rem" />
	</label>

	<button class="btn-fetch" onclick={fetchData} disabled={loading}>
		{loading ? 'Loading…' : '⟳ Fetch'}
	</button>
</div>

{#if error}
	<div class="error">⚠ {error}</div>
{:else if loading}
	<div class="spinner-row">
		<span class="spinner"></span> Fetching {resource}…
	</div>
{:else if data.length}
	<div class="table-wrap">
		<table>
			<thead>
				<tr>
					{#each summaryKeys[resource] as key}
						<th>{key}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as row (row.id)}
					<tr>
						{#each summaryKeys[resource] as key}
							<td>
								{#if typeof row[key] === 'boolean'}
									<span class="badge" class:done={row[key]}>{row[key] ? 'done' : 'open'}</span>
								{:else}
									{row[key]}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	a {
		color: #818cf8;
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: flex-end;
		margin-top: 1.5rem;
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 12px;
		padding: 1.25rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-size: 0.85rem;
		color: #94a3b8;
	}

	select {
		background: #0f172a;
		border: 1px solid #334155;
		border-radius: 8px;
		color: #e2e8f0;
		font-size: 0.95rem;
		padding: 0.5rem 0.75rem;
		outline: none;
	}

	.btn-fetch {
		background: #4f46e5;
		color: #fff;
		align-self: flex-end;
	}

	.btn-fetch:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}

	.spinner-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1.5rem;
		color: #64748b;
	}

	.spinner {
		display: inline-block;
		width: 1.25rem;
		height: 1.25rem;
		border: 2px solid #334155;
		border-top-color: #6366f1;
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.error {
		margin-top: 1.5rem;
		background: #450a0a;
		border: 1px solid #991b1b;
		border-radius: 8px;
		padding: 0.85rem 1rem;
		color: #fca5a5;
	}

	.table-wrap {
		margin-top: 1.5rem;
		overflow-x: auto;
		border-radius: 10px;
		border: 1px solid #334155;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	th,
	td {
		padding: 0.65rem 1rem;
		text-align: left;
		border-bottom: 1px solid #1e293b;
	}

	th {
		background: #1e293b;
		color: #64748b;
		font-weight: 600;
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
	}

	td {
		background: #0f172a;
		color: #e2e8f0;
		max-width: 360px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.badge {
		display: inline-block;
		padding: 0.15em 0.5em;
		border-radius: 999px;
		font-size: 0.78rem;
		font-weight: 600;
		background: #374151;
		color: #94a3b8;
	}

	.badge.done {
		background: #14532d;
		color: #86efac;
	}
</style>
