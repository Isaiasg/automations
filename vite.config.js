import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// All SvelteKit configuration (adapter, compilerOptions) lives in svelte.config.js.
export default defineConfig({
	plugins: [sveltekit()]
});
