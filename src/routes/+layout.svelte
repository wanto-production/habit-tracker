<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import TogleSidebar from '$lib/components/togle-sidebar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { queryClient } from '$lib/query';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<ModeWatcher />
	<Sidebar.Provider>
		<AppSidebar user={data.user} />
		<main class=" w-full">
			<!-- <Sidebar.Trigger class="absolute m-2 text-2xl" /> -->
			<TogleSidebar />
			{@render children?.()}
		</main>
	</Sidebar.Provider>
</QueryClientProvider>
