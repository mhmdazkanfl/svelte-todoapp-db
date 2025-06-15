<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import User from '@lucide/svelte/icons/user';
	import { enhance } from '$app/forms';

	let userStats = {
		totalTasks: 0,
		completedTasks: 0,
		activeTasks: 0
	};
</script>

<div class="mx-auto w-full max-w-2xl space-y-6">
	<div class="flex items-center gap-4">
		<Button href="/" variant="outline" size="sm">← Back to Tasks</Button>
	</div>

	<Card.Root class="w-full">
		<Card.Header class="text-center sm:text-left">
			<div class="flex flex-col items-center gap-4 sm:flex-row">
				<div class="bg-primary/10 rounded-full p-4">
					<User class="text-primary h-8 w-8" />
				</div>
				<div class="space-y-1">
					<Card.Title class="text-xl sm:text-2xl">Your Profile</Card.Title>
					<Card.Description class="text-sm sm:text-base">
						Manage your account and view your task statistics
					</Card.Description>
				</div>
			</div>
		</Card.Header>

		<Card.Content class="space-y-6">
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">Task Statistics</h3>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div class="bg-muted/50 rounded-lg p-4 text-center">
						<div class="text-primary text-2xl font-bold">{userStats.totalTasks}</div>
						<div class="text-muted-foreground text-sm">Total Tasks</div>
					</div>
					<div class="bg-muted/50 rounded-lg p-4 text-center">
						<div class="text-2xl font-bold text-green-600">{userStats.completedTasks}</div>
						<div class="text-muted-foreground text-sm">Completed</div>
					</div>
					<div class="bg-muted/50 rounded-lg p-4 text-center">
						<div class="text-2xl font-bold text-blue-600">{userStats.activeTasks}</div>
						<div class="text-muted-foreground text-sm">Active</div>
					</div>
				</div>
			</div>

			<div class="space-y-4">
				<h3 class="text-lg font-semibold">Account Actions</h3>
				<div class="space-y-3">
					<Button variant="outline" class="w-full sm:w-auto">Change Password</Button>
					<Button variant="outline" class="w-full sm:w-auto">Export Tasks</Button>
				</div>
			</div>
		</Card.Content>

		<Card.Footer class="flex flex-col gap-3 sm:flex-row">
			<form method="POST" action="?/logout" use:enhance class="w-full sm:w-auto">
				<Button type="submit" variant="destructive" class="w-full sm:w-auto">Sign Out</Button>
			</form>
		</Card.Footer>
	</Card.Root>
</div>
