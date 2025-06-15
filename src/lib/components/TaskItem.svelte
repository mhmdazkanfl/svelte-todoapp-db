<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Task } from '$lib/server/task';
	import { Button } from './ui/button';
	import { Checkbox } from './ui/checkbox';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Trash from '@lucide/svelte/icons/trash';
	import * as AlertDialog from './ui/alert-dialog';
	import { buttonVariants } from './ui/button';

	let { task }: { task: Task } = $props();
	let isEditOpen = $state(false);
	let isTaskOpen = $state(false);

	let checked = $state(Boolean(task.completed));

	async function updateTask() {
		const response = await fetch('/api/task', {
			method: 'POST',
			body: JSON.stringify({ task, checked, action: 0 }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.ok) {
			await invalidateAll();
		}
	}

	async function deleteTask(event: Event) {
		event.stopPropagation();
		const response = await fetch('/api/task', {
			method: 'POST',
			body: JSON.stringify({ task, checked, action: 1 }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.ok) {
			await invalidateAll();
		}
	}

	function editTask(event: Event) {
		event.stopPropagation(); // Prevent parent div click
		isEditOpen = true;
	}

	function handleCheckboxClick(event: Event) {
		event.stopPropagation(); // Prevent parent div click
	}

	function openTask() {
		console.log('Ciguy');
	}
</script>

<div
	class="flex py-2"
	onclick={openTask}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Enter' && openTask()}
>
	<Checkbox
		class="mr-3 h-4 w-4 flex-none self-center"
		bind:checked
		onCheckedChange={updateTask}
		onclick={handleCheckboxClick}
	/>

	<div class="mr-3 flex w-full grow flex-col justify-center">
		<p>{task.title}</p>
		{#if task.description && task.description.trim() !== ''}
			<p class="text-muted-foreground line-clamp-3 text-sm">{task.description}</p>
		{/if}
	</div>

	<div class="flex flex-none items-center justify-center gap-2">
		<Button size="icon" onclick={editTask}>
			<Pencil />
		</Button>
		<Button variant="destructive" size="icon" onclick={deleteTask}>
			<Trash />
		</Button>
	</div>
</div>

<AlertDialog.Root bind:open={isEditOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
