<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeProvider from '$lib/components/theme/theme-provider.svelte';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import TogleSidebar from '$lib/components/togle-sidebar.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ThemeProvider>
	<Sidebar.Provider>
		<AppSidebar user={data.user} />
		<main class=" w-full">
			<!-- <Sidebar.Trigger class="absolute m-2 text-2xl" /> -->
			<TogleSidebar />
			{@render children?.()}
		</main>
	</Sidebar.Provider>
</ThemeProvider>
