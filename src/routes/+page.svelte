<script lang="ts">
	import { SunIcon, MoonIcon } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';

	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	let isSignUp: Boolean = $state(false);

	function changeSignUpState() {
		isSignUp = !isSignUp;
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<div class="mb-4 flex flex-col">
		<h1 class="text-center text-xl font-bold">Welcome to Todo App</h1>
		<p class="text-muted-foreground text-center">by ts0ra</p>
	</div>

	{#if isSignUp}
		<Card.Root class="center w-full max-w-sm">
			<Card.Header>
				<Card.Title>Sign Up</Card.Title>
				<Card.Description>Enter your information to create an account</Card.Description>
				<Card.Action>
					<Button onclick={changeSignUpState} variant="link">Sign In</Button>
					<Button onclick={toggleMode} variant="outline" size="icon">
						<SunIcon
							class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
						/>
						<MoonIcon
							class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
						/>
						<span class="sr-only">Toggle theme</span>
					</Button>
				</Card.Action>
			</Card.Header>

			<Card.Content>
				<form>
					<div class="flex flex-col gap-6">
						<div class="grid gap-2">
							<Label for="username">Username</Label>
							<Input id="username" type="text" name="username" required />
						</div>
						<div class="grid gap-2">
							<Label for="email">Email</Label>
							<Input id="email" type="email" name="email" placeholder="m@example.com" required />
						</div>
						<div class="grid gap-2">
							<Label for="password">Password</Label>
							<Input id="password" type="password" name="password" required />
						</div>
					</div>
				</form>
			</Card.Content>

			<Card.Footer class="flex-col gap-2">
				<Button type="submit" class="w-full">Sign Up</Button>
			</Card.Footer>
		</Card.Root>
	{:else}
		<Card.Root class="center w-full max-w-sm">
			<Card.Header>
				<Card.Title>Sign In</Card.Title>
				<Card.Description>Enter your email below to login to your account</Card.Description>
				<Card.Action>
					<Button onclick={changeSignUpState} variant="link">Sign Up</Button>
					<Button onclick={toggleMode} variant="outline" size="icon">
						<SunIcon
							class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
						/>
						<MoonIcon
							class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
						/>
						<span class="sr-only">Toggle theme</span>
					</Button>
				</Card.Action>
			</Card.Header>

			<Card.Content>
				<form>
					<div class="flex flex-col gap-6">
						<div class="grid gap-2">
							<Label for="email">Email or Username</Label>
							<Input id="email" type="email" required />
						</div>
						<div class="grid gap-2">
							<div class="flex items-center">
								<Label for="password">Password</Label>
								<a
									href="##"
									class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								>
									Forgot your password?
								</a>
							</div>
							<Input id="password" type="password" required />
						</div>
					</div>
				</form>
			</Card.Content>

			<Card.Footer class="flex-col gap-2">
				<Button type="submit" class="w-full">Login</Button>
			</Card.Footer>
		</Card.Root>
	{/if}
</div>
