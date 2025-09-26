<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/store/theme-store';

	onMount(() => {
		theme.init();
	});

	let { children } = $props();
</script>

{@render children()}
