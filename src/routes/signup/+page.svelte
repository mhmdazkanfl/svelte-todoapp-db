<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Loader2Icon from '@lucide/svelte/icons/loader-2';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let username = $state('');
	let email = $state('');
	let password = $state('');

	$effect(() => {
		if (form?.username) username = form.username as string;
		if (form?.email) email = form.email as string;
		if (form?.password) password = form.password as string;
	});

	const isFormValid = $derived(Boolean(username?.trim() && email?.trim() && password?.trim()));
	let isLoading = $state(false);
	// const isFormValid = true;
</script>

<Card.Root class="center w-full max-w-sm">
	<Card.Header>
		<Card.Title>Sign Up</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
		<Card.Action>
			<Button href="/login" variant="link">Login</Button>
		</Card.Action>
	</Card.Header>

	<Card.Content>
		<form
			id="signup-form"
			method="POST"
			action="?/signup"
			use:enhance={({ submitter }) => {
				isLoading = true;

				return async ({ result, update }) => {
					isLoading = false;
					await update();
				};
			}}
		>
			<div class="flex flex-col gap-6">
				<div class="grid gap-2">
					<Label for="username">Username</Label>
					<Input id="username" type="text" bind:value={username} name="username" required />
				</div>
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						bind:value={email}
						name="email"
						placeholder="m@example.com"
						required
					/>
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" bind:value={password} name="password" required />
				</div>
			</div>
		</form>
		<!-- <p class="mt-4 text-red-500" hidden={form?.hideError ?? true}>{form?.message ?? ''}</p> -->
		{#if form?.message && !form?.hideError}
			<p class="mt-4 text-red-500">{form.message}</p>
		{/if}
	</Card.Content>

	<Card.Footer class="flex-col gap-2">
		<Button type="submit" class="w-full" form="signup-form" disabled={!isFormValid || isLoading}>
			{#if isLoading}
				<Loader2Icon class="animate-spin" />
				Please wait
			{:else}
				Sign Up
			{/if}
		</Button>
	</Card.Footer>
</Card.Root>
