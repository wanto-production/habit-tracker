<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import { CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Tabs from '$lib/components/ui/tabs/tabs.svelte';
	import { TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { enhance } from '$app/forms';

	// Form states
	let loginLoading = $state(false);
	let registerLoading = $state(false);

	let { form } = $props();
</script>

<div class="flex h-screen w-full items-center justify-center">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle class="text-2xl font-bold">Welcome Back</CardTitle>
			<CardDescription>Sign in to your account or create a new one</CardDescription>
		</CardHeader>

		<CardContent>
			<Tabs value="register" class="w-full">
				<TabsList class="grid w-full grid-cols-2">
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="register">Register</TabsTrigger>
				</TabsList>

				<TabsContent value="login" class="mt-4 space-y-4">
					<form
						method="post"
						action="?/login"
						use:enhance={() => {
							loginLoading = true;
							return async ({ update }) => {
								await update();
								loginLoading = false;
							};
						}}
						class="space-y-4"
					>
						{#if form?.loginError}
							<div class="rounded-md bg-destructive/20 p-3 text-sm text-destructive">
								{form?.loginError}
							</div>
						{/if}

						<div class="space-y-2">
							<Label for="login-email">Email</Label>
							<Input
								id="login-email"
								name="email"
								type="email"
								placeholder="name@example.com"
								required
							/>
						</div>

						<div class="space-y-2">
							<Label for="login-password">Password</Label>
							<Input id="login-password" name="password" type="password" required />
						</div>

						<Button type="submit" class="w-full" variant="default" disabled={loginLoading}>
							{#if loginLoading}
								Signing in...
							{:else}
								Sign In
							{/if}
						</Button>
					</form>

					<div class="mt-4 text-center text-sm text-muted-foreground">
						<a href="/forgot-password" class="text-primary hover:underline">Forgot your password?</a
						>
					</div>
				</TabsContent>

				<TabsContent value="register" class="mt-4 space-y-4">
					<form
						method="post"
						action="?/register"
						use:enhance={() => {
							registerLoading = true;
							return async ({ update }) => {
								await update();
								registerLoading = false;
							};
						}}
						class="space-y-4"
					>
						{#if form?.registerError}
							<div class="rounded-md bg-destructive/20 p-3 text-sm text-destructive">
								{form?.registerError}
							</div>
						{/if}

						<div class="space-y-2">
							<Label for="register-name">Full Name</Label>
							<Input id="register-name" name="name" placeholder="John Doe" required />
						</div>

						<div class="space-y-2">
							<Label for="register-email">Email</Label>
							<Input
								id="register-email"
								name="email"
								type="email"
								placeholder="name@example.com"
								required
							/>
						</div>

						<div class="space-y-2">
							<Label for="register-password">Password</Label>
							<Input id="register-password" name="password" type="password" required />
						</div>

						<div class="space-y-2">
							<Label for="register-confirm-password">Confirm Password</Label>
							<Input
								id="register-confirm-password"
								name="confirmPassword"
								type="password"
								required
							/>
						</div>

						<Button type="submit" class="w-full" variant="default" disabled={registerLoading}>
							{#if registerLoading}
								Creating account...
							{:else}
								Create Account
							{/if}
						</Button>
					</form>
				</TabsContent>
			</Tabs>
		</CardContent>
	</Card>
</div>
