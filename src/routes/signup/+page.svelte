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

<div class="mx-auto w-full max-w-sm sm:max-w-md">
	<Card.Root class="w-full shadow-lg">
		<Card.Header class="space-y-2 text-center sm:text-left">
			<Card.Title class="text-xl font-bold sm:text-2xl">Create Account</Card.Title>
			<Card.Description class="text-muted-foreground text-sm sm:text-base">
				Enter your information to create an account
			</Card.Description>
			<Card.Action class="pt-2">
				<div class="text-center">
					<span class="text-muted-foreground text-sm">Already have an account?</span>
					<Button href="/login" variant="link" class="text-primary h-auto p-0 font-medium">
						Sign in here
					</Button>
				</div>
			</Card.Action>
		</Card.Header>

		<Card.Content class="space-y-4">
			<form
				id="signup-form"
				method="POST"
				action="?/signup"
				class="space-y-4"
				use:enhance={({ submitter }) => {
					isLoading = true;

					return async ({ result, update }) => {
						isLoading = false;
						await update();
					};
				}}
			>
				<div class="space-y-4">
					<div class="space-y-2">
						<Label for="username" class="text-sm font-medium">Username</Label>
						<Input
							id="username"
							type="text"
							bind:value={username}
							name="username"
							placeholder="Enter your username"
							class="text-sm sm:text-base"
							required
						/>
					</div>
					<div class="space-y-2">
						<Label for="email" class="text-sm font-medium">Email</Label>
						<Input
							id="email"
							type="email"
							bind:value={email}
							name="email"
							placeholder="Enter your email address"
							class="text-sm sm:text-base"
							required
						/>
					</div>
					<div class="space-y-2">
						<Label for="password" class="text-sm font-medium">Password</Label>
						<Input
							id="password"
							type="password"
							bind:value={password}
							name="password"
							placeholder="Create a secure password"
							class="text-sm sm:text-base"
							required
						/>
					</div>
				</div>
			</form>

			{#if form?.message && !form?.hideError}
				<div class="bg-destructive/15 mt-4 rounded-md p-3">
					<p class="text-destructive text-sm font-medium">{form.message}</p>
				</div>
			{/if}
		</Card.Content>

		<Card.Footer class="space-y-3">
			<Button
				type="submit"
				class="w-full text-sm font-medium sm:text-base"
				form="signup-form"
				disabled={!isFormValid || isLoading}
			>
				{#if isLoading}
					<Loader2Icon class="mr-2 h-4 w-4 animate-spin" />
					Creating account...
				{:else}
					Create Account
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
