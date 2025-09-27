<script lang="ts">
	import {
		HouseIcon,
		LayoutDashboardIcon,
		TrophyIcon,
		SearchIcon,
		SettingsIcon
	} from '@lucide/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/state';
	import type { User } from 'better-auth';
	import { Button } from './ui/button';
	import { logout } from '$lib/auth-client';
	import logo from '$lib/assets/favicon.png';

	const items = [
		{ title: 'Home', url: '/', icon: HouseIcon },
		{ title: 'Dashboard', url: '/dashboard', icon: LayoutDashboardIcon },
		{ title: 'Create Habits', url: '/habits', icon: TrophyIcon },
		{ title: 'Search', url: '/search', icon: SearchIcon },
		{ title: 'Settings', url: '/settings', icon: SettingsIcon }
	];

	const activePath = $derived(page.url.pathname);
	let { user }: { user: User } = $props();
</script>

<Sidebar.Root class="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
	<Sidebar.Header>
		<div class=" m-2 flex items-center gap-2 rounded-md bg-sidebar-primary/50 p-2">
			<img src={logo} alt="logo" class=" h-auto w-10 rounded-full" />
			<h1 class=" text-2xl text-sidebar-foreground">habit tracker</h1>
		</div>
	</Sidebar.Header>
	<Sidebar.Content class="py-4">
		<Sidebar.Group>
			<Sidebar.GroupLabel
				class="px-4 py-2 text-xs font-semibold tracking-wider text-sidebar-foreground/70 uppercase"
			>
				Overview
			</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem class="mb-1 px-2">
							<Sidebar.MenuButton
								class="relative flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium transition-all duration-200"
							>
								{#snippet child({ props })}
									<div
										class="rounded-lg p-3 {item.url == activePath
											? 'bg-sidebar-primary/10 text-sidebar-primary'
											: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}"
									>
										<a href={item.url} {...props} class="flex w-full items-center gap-3 px-2">
											<span
												class={`h-5 w-5 shrink-0 ${item.url === activePath ? 'text-sidebar-primary' : 'text-sidebar-foreground'}`}
											>
												<item.icon />
											</span>
											<span>{item.title}</span>
											{#if item.url === activePath}
												<span class="absolute right-5 h-1.5 w-1.5 rounded-full bg-sidebar-primary"
												></span>
											{/if}
										</a>
									</div>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				{#if user}
					<div class="m-4 text-left">
						<p class="text-sm text-muted-foreground">Welcome back, {user.name}</p>
						<Button onclick={() => logout()} variant="ghost" class="mt-2 text-sm">Log out</Button>
					</div>
				{:else}
					<div class=" m-3 rounded-md bg-sidebar-primary/70 p-3">
						<a class=" text-sidebar-foreground" href="/auth">login & register</a>
					</div>
				{/if}
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
