<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Loader2Icon from '@lucide/svelte/icons/loader-2';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let isLoading = $state(false);
</script>

<Card.Root class="center w-full max-w-sm">
	<Card.Header>
		<Card.Title>Sign In</Card.Title>
		<Card.Description>Enter your email or username below to login to your account</Card.Description>
		<Card.Action>
			<Button href="/signup" variant="link">Sign Up</Button>
		</Card.Action>
	</Card.Header>

	<Card.Content>
		<form
			id="login-form"
			method="POST"
			action="?/login"
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
					<Label for="username-or-password">Email or Username</Label>
					<Input id="username-or-password" type="text" name="username-or-password" required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="##" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" name="password" required />
				</div>
			</div>
		</form>
		{#if form?.message && !form?.hideError}
			<p class="mt-4 text-red-500">{form.message}</p>
		{/if}
	</Card.Content>

	<Card.Footer class="flex-col gap-2">
		<Button type="submit" class="w-full" form="login-form" disabled={isLoading}>
			{#if isLoading}
				<Loader2Icon class="animate-spin" />
				Please wait
			{:else}
				Login
			{/if}
		</Button>
	</Card.Footer>
</Card.Root>
