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

<div class="mx-auto w-full max-w-sm sm:max-w-md">
	<Card.Root class="w-full shadow-lg">
		<Card.Header class="space-y-2 text-center sm:text-left">
			<Card.Title class="text-xl font-bold sm:text-2xl">Welcome Back</Card.Title>
			<Card.Description class="text-muted-foreground text-sm sm:text-base">
				Sign in to your account to access your tasks
			</Card.Description>
			<Card.Action class="pt-2">
				<div class="text-center">
					<span class="text-muted-foreground text-sm">Don't have an account?</span>
					<Button href="/signup" variant="link" class="text-primary h-auto p-0 font-medium">
						Create one here
					</Button>
				</div>
			</Card.Action>
		</Card.Header>

		<Card.Content class="space-y-4">
			<form
				id="login-form"
				method="POST"
				action="?/login"
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
						<Label for="username-or-password" class="text-sm font-medium">Email or Username</Label>
						<Input
							id="username-or-password"
							type="text"
							name="username-or-password"
							placeholder="Enter your email or username"
							class="text-sm sm:text-base"
							required
						/>
					</div>
					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<Label for="password" class="text-sm font-medium">Password</Label>
							<a
								href="##"
								class="text-primary hover:text-primary/80 text-xs underline-offset-4 hover:underline sm:text-sm"
							>
								Forgot password?
							</a>
						</div>
						<Input
							id="password"
							type="password"
							name="password"
							placeholder="Enter your password"
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
				form="login-form"
				disabled={isLoading}
			>
				{#if isLoading}
					<Loader2Icon class="mr-2 h-4 w-4 animate-spin" />
					Signing in...
				{:else}
					Sign In
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
