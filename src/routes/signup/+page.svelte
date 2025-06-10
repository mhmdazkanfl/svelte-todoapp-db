<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { goto } from '$app/navigation';
</script>

<Card.Root class="center w-full max-w-sm">
	<Card.Header>
		<Card.Title>Sign Up</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
		<Card.Action>
			<Button onclick={() => goto('/login')} variant="link">Login</Button>
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
