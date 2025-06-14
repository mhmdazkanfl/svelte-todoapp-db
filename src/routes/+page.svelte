<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Badge } from '$lib/components/ui/badge';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import Search from '@lucide/svelte/icons/search';
	import Loader2Icon from '@lucide/svelte/icons/loader-2';
	import { enhance } from '$app/forms';
	import TaskList from '$lib/components/TaskList.svelte';

	let isLoading = $state(false);
</script>

<form class="absolute top-4 right-16" method="POST" action="?/logout" use:enhance>
	<Button type="submit">Log out</Button>
</form>

<div class="max-h-9/10 w-full max-w-sm md:max-w-xl">
	<Card.Root class="center mb-4 w-full max-w-sm md:max-w-xl">
		<Card.Header>
			<Card.Title class="text-center">Add new task</Card.Title>
		</Card.Header>
		<Card.Content>
			<form
				id="add-form"
				action="?/addTask"
				method="POST"
				use:enhance={({ submitter }) => {
					isLoading = true;

					return async ({ result, update }) => {
						isLoading = false;
						await update();
					};
				}}
			>
				<Input id="title" type="text" name="title" class="mb-2" placeholder="Title" required />
				<Textarea id="description" name="description" placeholder="Description"></Textarea>
			</form>
		</Card.Content>
		<Card.Footer>
			<Button type="submit" form="add-form" disabled={isLoading}>
				{#if isLoading}
					<Loader2Icon class="animate-spin" />
					Please wait
				{:else}
					Add
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>

	<div class="center flex w-full max-w-sm flex-col gap-6 md:max-w-xl">
		<Tabs.Root value="all">
			<Tabs.List>
				<Tabs.Trigger value="all">
					All
					<Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">12</Badge>
				</Tabs.Trigger>
				<Tabs.Trigger value="active">
					Active
					<Badge
						class="h-5 min-w-5 rounded-full bg-blue-600 px-1 font-mono text-white tabular-nums dark:bg-blue-500 "
						>10
					</Badge>
				</Tabs.Trigger>
				<Tabs.Trigger value="completed">
					Completed
					<Badge variant="destructive" class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
						2
					</Badge>
				</Tabs.Trigger>
			</Tabs.List>

			<div class="relative">
				<Search class="text-muted-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
				<Input placeholder="Filters" class="pl-8" />
			</div>

			<Tabs.Content value="all">
				<TaskList></TaskList>
			</Tabs.Content>
			<Tabs.Content value="active">
				<TaskList></TaskList>
			</Tabs.Content>
			<Tabs.Content value="completed">
				<TaskList></TaskList>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
