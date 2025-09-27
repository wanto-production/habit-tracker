<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { ChartBar, Plus, Check, TrendingUp, Trash } from '@lucide/svelte';
	import { checkInHabit, deleteCheckIn, deleteHabit } from '$lib/services/habit-service';
	import axios from 'axios';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import { queryClient } from '$lib/query';

	const habitsQuery = createQuery({
		queryKey: ['habits'],
		queryFn: async () => {
			const response = await axios.get('/api/habits');
			return response.data;
		}
	});

	const habitCheckInMut = createMutation({
		mutationFn: (id: string) => checkInHabit(id, new Date().toISOString().split('T')[0]),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] })
	});

	const habitDelCheckMut = createMutation({
		mutationFn: (id: string) => deleteCheckIn(id, new Date().toISOString().split('T')[0]),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] })
	});

	const habitDelMut = createMutation({
		mutationFn: (id: string) => deleteHabit(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] })
	});
</script>

{#if $habitsQuery.isPending}
	<section class="container mx-auto px-4 pb-8">
		<div class="mb-8">
			<Skeleton class="mb-3 h-8 w-1/4" />
			<Skeleton class="h-5 w-2/5" />
		</div>

		<!-- Stats Cards Skeleton -->
		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">
						<Skeleton class="h-4 w-24" />
					</CardTitle>
					<TrendingUp class="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<Skeleton class="h-8 w-16" />
					<Skeleton class="h-3 w-28" />
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">
						<Skeleton class="h-4 w-32" />
					</CardTitle>
					<Check class="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<Skeleton class="h-8 w-16" />
					<Skeleton class="h-3 w-32" />
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">
						<Skeleton class="h-4 w-28" />
					</CardTitle>
					<ChartBar class="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<Skeleton class="h-8 w-16" />
					<Skeleton class="h-3 w-24" />
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">
						<Skeleton class="h-4 w-24" />
					</CardTitle>
					<TrendingUp class="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<Skeleton class="h-8 w-20" />
					<Skeleton class="h-3 w-20" />
				</CardContent>
			</Card>
		</div>

		<!-- Habits List Skeleton -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each [1, 2, 3, 4, 5, 6] as _}
				<Card class="transition-shadow hover:shadow-md">
					<CardHeader>
						<CardTitle class="flex items-start justify-between">
							<Skeleton class="h-5 w-3/4" />
							<Skeleton class="h-6 w-16 rounded-full" />
						</CardTitle>
						<Skeleton class="mt-2 h-4 w-full" />
					</CardHeader>
					<CardContent>
						<div class="flex items-center justify-between">
							<Skeleton class="h-4 w-24" />
							<Skeleton class="h-9 w-20" />
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
	</section>
{:else if $habitsQuery.isError}
	<div class="container mx-auto flex h-[50vh] items-center justify-center px-4 pt-[60px] pb-8">
		<div class="text-center">
			<p class="text-lg text-destructive">Error loading habits: {$habitsQuery.error?.message}</p>
			<Button class="mt-4" onclick={() => window.location.reload()}>Reload Page</Button>
		</div>
	</div>
{:else if $habitsQuery.data}
	<section class="container mx-auto px-4 pt-[60px] pb-8">
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
					<div class="text-2xl font-bold">{$habitsQuery.data.stats?.habitsCount || 0}</div>
					<p class="text-xs text-muted-foreground">Habits you're tracking</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Completed Today</CardTitle>
					<Check class="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">{$habitsQuery.data.stats?.completedToday || 0}</div>
					<p class="text-xs text-muted-foreground">
						Out of {$habitsQuery.data.habits?.length || 0} habits
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Total Check-ins</CardTitle>
					<ChartBar class="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">{$habitsQuery.data.stats?.totalCheckIns || 0}</div>
					<p class="text-xs text-muted-foreground">Actions taken</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle class="text-sm font-medium">Current Streak</CardTitle>
					<TrendingUp class="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">{$habitsQuery.data.stats?.currentStreak || 0} days</div>
					<p class="text-xs text-muted-foreground">Keep it up!</p>
				</CardContent>
			</Card>
		</div>

		<!-- Habits List -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each $habitsQuery.data.habits as habit (habit.id)}
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
							<Button
								size="sm"
								variant="destructive"
								disabled={$habitDelMut.isPending}
								onclick={() => $habitDelMut.mutate(habit.id)}
							>
								<Trash class="mr-2 h-4 w-4" />
								delete
							</Button>
							{#if habit.isCheckedInToday}
								<Button
									size="sm"
									variant="destructive"
									disabled={$habitDelCheckMut.isPending}
									onclick={() => $habitDelCheckMut.mutate(habit.id)}
								>
									<Check class="mr-2 h-4 w-4" />
									Uncheck
								</Button>
							{:else}
								<Button
									size="sm"
									variant="outline"
									disabled={$habitCheckInMut.isPending}
									onclick={() => $habitCheckInMut.mutate(habit.id)}
								>
									<Check class="mr-2 h-4 w-4" />
									Check In
								</Button>
							{/if}
						</div>
					</CardContent>
				</Card>
			{:else}
				<div class="col-span-full text-center py-12">
					<h3 class="text-lg font-medium">No habits yet</h3>
					<p class="text-muted-foreground mb-4">Create your first habit to get started</p>
					<Button href="/habits">
						<Plus class="h-4 w-4 mr-2" />
						Create Habit
					</Button>
				</div>
			{/each}
		</div>
	</section>
{/if}
