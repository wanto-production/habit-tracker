<!-- src/lib/components/theme-toggle.svelte -->
<script lang="ts">
	import { theme } from '$lib/store/theme-store';
	import { Moon, Sun } from '@lucide/svelte';
	import { toggleMode } from 'mode-watcher';
</script>

<button onclick={toggleMode} class="rounded-md p-2 hover:bg-muted" aria-label="Toggle theme">
	{#if $theme === 'dark'}
		<Sun size="15" />
	{:else if $theme === 'light'}
		<Moon size="15" />
	{/if}
</button>
