<script lang="ts">
	import { SidebarIcon } from '@lucide/svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import ThemeTogle from './theme-togle.svelte';
	const sidebar = useSidebar();
</script>

<div
	class="sticky top-3 m-3 flex w-fit items-center justify-center gap-3 rounded-md bg-sidebar-primary/70 p-1"
>
	<button class="rounded-md p-2 hover:bg-muted" onclick={() => sidebar.toggle()}>
		<SidebarIcon size="15" />
	</button>
	<ThemeTogle />
</div>
