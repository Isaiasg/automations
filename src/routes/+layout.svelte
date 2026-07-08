<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/counter', label: 'Counter' },
		{ href: '/todos', label: 'Todos' },
		{ href: '/fetch', label: 'Fetch' },
		{ href: '/transitions', label: 'Transitions' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<span class="brand">⚡ SvelteKit SPA</span>
	<ul>
		{#each navLinks as link}
			<li><a href={link.href}>{link.label}</a></li>
		{/each}
	</ul>
</nav>

<main>
	{@render children()}
</main>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-family: system-ui, -apple-system, sans-serif;
		background: #0f0f1a;
		color: #e2e8f0;
		min-height: 100vh;
	}

	:global(h1) {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	:global(h2) {
		font-size: 1.4rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	:global(p) {
		line-height: 1.6;
		color: #94a3b8;
	}

	:global(button) {
		cursor: pointer;
		border: none;
		border-radius: 8px;
		padding: 0.5rem 1.25rem;
		font-size: 0.95rem;
		font-weight: 600;
		transition: opacity 0.15s, transform 0.1s;
	}

	:global(button:hover) {
		opacity: 0.85;
		transform: translateY(-1px);
	}

	:global(button:active) {
		transform: translateY(0);
	}

	:global(input[type='text'], input[type='number']) {
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 8px;
		color: #e2e8f0;
		font-size: 0.95rem;
		padding: 0.5rem 0.75rem;
		outline: none;
		transition: border-color 0.15s;
	}

	:global(input[type='text']:focus, input[type='number']:focus) {
		border-color: #6366f1;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.85rem 2rem;
		background: #1e1e2e;
		border-bottom: 1px solid #2d2d3f;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.brand {
		font-weight: 700;
		font-size: 1.05rem;
		color: #a5b4fc;
		margin-right: auto;
		white-space: nowrap;
	}

	ul {
		list-style: none;
		display: flex;
		gap: 0.25rem;
	}

	a {
		text-decoration: none;
		color: #94a3b8;
		padding: 0.4rem 0.85rem;
		border-radius: 6px;
		font-size: 0.9rem;
		font-weight: 500;
		transition: background 0.15s, color 0.15s;
	}

	a:hover,
	:global(a[aria-current='page']) {
		background: #312e81;
		color: #a5b4fc;
	}

	main {
		max-width: 860px;
		margin: 0 auto;
		padding: 2.5rem 1.5rem;
	}
</style>
