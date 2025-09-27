<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Github, Chrome, Check } from '@lucide/svelte';

	// This page is only shown to non-authenticated users
	// Authenticated users are redirected to /dashboard by +page.server.ts
</script>

<section class="flex min-h-screen w-full flex-col items-center">
	<!-- Hero Section -->
	<div class="container flex max-w-5xl flex-col items-center justify-center py-12 md:py-20">
		<div class="flex flex-col items-center space-y-6 text-center">
			<h1 class="text-4xl font-bold tracking-tight md:text-6xl">
				Build Better <span class="text-primary">Habits</span>, One Day at a Time
			</h1>
			<p class="max-w-2xl text-lg text-muted-foreground md:text-xl">
				Transform your life with our intuitive habit tracker. Track your progress, build
				consistency, and achieve your goals with ease.
			</p>
			<div class="flex w-full max-w-md flex-col gap-4 pt-4 sm:flex-row">
				<a
					href="/auth"
					class="inline-flex flex-1 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
				>
					Get Started Free
				</a>
				<a
					href="/auth"
					class="inline-flex flex-1 items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
				>
					Live Demo
				</a>
			</div>
		</div>
	</div>

	<!-- Features Section -->
	<div class="w-full bg-muted py-16">
		<div class="flex w-full flex-col items-center justify-center px-6">
			<h2 class="mb-16 text-center text-3xl font-bold">Why Choose Our Habit Tracker?</h2>

			<div class="flex w-full justify-center gap-3">
				<Card>
					<CardHeader>
						<div class="mb-4 w-fit rounded-lg bg-primary/10 p-3">
							<Check class="h-6 w-6 text-primary" />
						</div>
						<CardTitle>Easy Tracking</CardTitle>
						<CardDescription>
							Simply tap to check off your habits each day with our intuitive interface.
						</CardDescription>
					</CardHeader>
					<CardContent>
						Track daily habits with one tap and visualize your progress with beautiful charts.
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-4 w-fit rounded-lg bg-primary/10 p-3">
							<Chrome class="h-6 w-6 text-primary" />
						</div>
						<CardTitle>Streaks & Motivation</CardTitle>
						<CardDescription>
							Maintain streaks and get motivated by seeing your progress over time.
						</CardDescription>
					</CardHeader>
					<CardContent>
						Built-in streak tracking to keep you motivated and committed to your goals.
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-4 w-fit rounded-lg bg-primary/10 p-3">
							<Github class="h-6 w-6 text-primary" />
						</div>
						<CardTitle>Analytics</CardTitle>
						<CardDescription>
							Get insights into your habits with detailed analytics and statistics.
						</CardDescription>
					</CardHeader>
					<CardContent>
						Understand your patterns with comprehensive analytics and visual reports.
					</CardContent>
				</Card>
			</div>
		</div>
	</div>

	<!-- How It Works Section -->
	<div class="container max-w-5xl py-16">
		<h2 class="mb-12 text-center text-3xl font-bold">How It Works</h2>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					1
				</div>
				<h3 class="mb-2 text-xl font-semibold">Create Your Habits</h3>
				<p class="text-muted-foreground">
					Define the habits you want to build with custom descriptions and targets.
				</p>
			</div>

			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					2
				</div>
				<h3 class="mb-2 text-xl font-semibold">Track Daily</h3>
				<p class="text-muted-foreground">
					Check off your habits each day to build consistency and maintain streaks.
				</p>
			</div>

			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					3
				</div>
				<h3 class="mb-2 text-xl font-semibold">Achieve Goals</h3>
				<p class="text-muted-foreground">
					See your progress over time and reach your long-term objectives.
				</p>
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	<div class="flex w-full justify-center bg-gradient-to-r from-primary to-primary/80 py-16">
		<div class="container max-w-3xl text-center text-primary-foreground">
			<h2 class="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Life?</h2>
			<p class="mx-auto mb-8 max-w-2xl text-lg">
				Join thousands of users who have built better habits and achieved their goals.
			</p>
			<a
				href="/auth"
				class="inline-flex items-center justify-center rounded-md bg-background px-6 py-3 text-sm font-medium text-foreground shadow transition-colors hover:bg-background/90 focus:ring-2 focus:ring-background focus:ring-offset-2 focus:outline-none"
			>
				Start Your Journey Today
			</a>
		</div>
	</div>
</section>
