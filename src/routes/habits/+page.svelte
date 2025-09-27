<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

<section class="h-screen w-full place-content-center px-2">
	<div class="mx-auto max-w-2xl">
		<Card>
			<CardHeader>
				<CardTitle>Create New Habit</CardTitle>
				<CardDescription>Start tracking a new habit to build better routines</CardDescription>
			</CardHeader>

			<form method="POST" use:enhance>
				{#if $message}
					<div
						class="mb-4 rounded-md p-3 text-white"
						class:bg-red-500={$message.error}
						class:bg-green-500={!$message.error}
					>
						{$message.text}
					</div>
				{/if}

				<CardContent class="space-y-4">
					<div class="space-y-2">
						<Label for="title">Habit Title</Label>
						<Input
							id="title"
							name="title"
							placeholder="e.g., Drink 8 glasses of water daily"
							required
							maxlength={100}
							bind:value={$form.title}
							class={$errors?.title ? 'border-destructive' : ''}
							aria-invalid={$errors?.title ? 'true' : 'false'}
						/>
						{#if $errors.title}
							<p class="text-sm text-destructive">{$errors.title}</p>
						{/if}
					</div>

					<div class="space-y-2">
						<Label for="description">Description (Optional)</Label>
						<Input
							id="description"
							name="description"
							placeholder="Add more details about this habit"
							maxlength={500}
							bind:value={$form.description}
							class={$errors?.description ? 'border-destructive' : ''}
							aria-invalid={$errors?.description ? 'true' : 'false'}
						/>
						{#if $errors?.description}
							<p class="text-sm text-destructive">{$errors.description}</p>
						{/if}
					</div>
				</CardContent>

				<CardFooter class="mt-4 flex justify-between">
					<Button type="button" variant="outline" onclick={() => goto('/dashboard')}>Cancel</Button>
					<Button type="submit">Create Habit</Button>
				</CardFooter>
			</form>
		</Card>
	</div>
</section>
