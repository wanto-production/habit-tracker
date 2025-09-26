<script lang="ts">
	import { Sidebar } from '@lucide/svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import ThemeTogle from './theme/theme-togle.svelte';
	const sidebar = useSidebar();
</script>

<div
	class="absolute m-3 flex items-center justify-center gap-3 rounded-md bg-sidebar-primary/70 p-1"
>
	<button class="rounded-md p-2 hover:bg-muted" onclick={() => sidebar.toggle()}
		><Sidebar size="15" /></button
	>
	<ThemeTogle />
</div>
