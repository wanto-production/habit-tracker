<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { logout } from '$lib/auth-client';
	import { ChartBar, Plus, Check, TrendingUp } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	// Types
	type Habit = {
		id: string;
		title: string;
		description: string | null;
		createdAt: Date | null;
		streak: number;
		completionRate: number;
	};

	type DashboardStats = {
		habitsCount: number;
		completedToday: number;
		totalCheckIns: number;
		currentStreak: number;
	};

	let { data } = $props<{
		user: { id: string; name: string; email: string } | null;
		habits: Habit[];
		stats: DashboardStats;
	}>();

	const { user, habits, stats } = data;

	async function createNewHabit() {
		await goto('/habits/new');
	}
</script>

<section class=" container mx-auto px-4 pt-[60px] pb-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold">Dashboard</h1>
		<p class="text-muted-foreground">Track your habits and monitor your progress</p>
	</div>

	<!-- Stats Cards -->
	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Habits</CardTitle>
				<TrendingUp class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats?.habitsCount || 0}</div>
				<p class="text-xs text-muted-foreground">Habits you're tracking</p>
			</CardContent>
		</Card>

		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Completed Today</CardTitle>
				<Check class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats?.completedToday || 0}</div>
				<p class="text-xs text-muted-foreground">Out of {habits?.length || 0} habits</p>
			</CardContent>
		</Card>

		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Check-ins</CardTitle>
				<ChartBar class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats?.totalCheckIns || 0}</div>
				<p class="text-xs text-muted-foreground">Actions taken</p>
			</CardContent>
		</Card>

		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Current Streak</CardTitle>
				<TrendingUp class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{stats?.currentStreak || 0} days</div>
				<p class="text-xs text-muted-foreground">Keep it up!</p>
			</CardContent>
		</Card>
	</div>

	<!-- Habits List -->
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each habits as habit (habit.id)}
			<Card class="transition-shadow hover:shadow-md">
				<CardHeader>
					<CardTitle class="flex items-start justify-between">
						<span>{habit.title}</span>
						<span class="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
							{habit.streak} day{habit.streak !== 1 ? 's' : ''} streak
						</span>
					</CardTitle>
					{#if habit.description}
						<CardDescription>{habit.description}</CardDescription>
					{/if}
				</CardHeader>
				<CardContent>
					<div class="flex items-center justify-between">
						<div class="text-sm">
							<span class="font-medium">Completion rate: </span>
							<span class="text-primary">{Math.round(habit.completionRate * 100)}%</span>
						</div>
						<Button size="sm" variant="outline" disabled>
							<Check class="mr-2 h-4 w-4" />
							Check In
						</Button>
					</div>
				</CardContent>
			</Card>
		{:else}
			<div class="col-span-full text-center py-12">
				<h3 class="text-lg font-medium">No habits yet</h3>
				<p class="text-muted-foreground mb-4">Create your first habit to get started</p>
				<Button onclick={createNewHabit}>
					<Plus class="h-4 w-4 mr-2" />
					Create Habit
				</Button>
			</div>
		{/each}
	</div>
</section>
