<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Input } from './ui/input';
	import { Textarea } from './ui/textarea';
	import type { Task } from '$lib/server/task';
	import { Button } from './ui/button';
	import { Checkbox } from './ui/checkbox';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Trash from '@lucide/svelte/icons/trash';
	import * as AlertDialog from './ui/alert-dialog';
	import { buttonVariants } from './ui/button';
	import { Label } from './ui/label';

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
		isTaskOpen = true;
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
			<p class="text-muted-foreground line-clamp-3 text-sm whitespace-pre-wrap">
				{task.description}
			</p>
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
		<form action="?/updateTask" method="POST">
			<input type="hidden" name="taskId" value={task.id} />
			<input type="hidden" name="checked" value={checked ? 'true' : 'false'} />
			<Label class="mb-1.5" for="title">Title</Label>
			<Input class="mb-3" value={task.title} name="title" id="title" type="text" required />
			<Label class="mb-1.5" for="description">Description</Label>
			<Textarea
				class="mb-3 resize-none"
				rows={8}
				value={task.description}
				name="description"
				id="description"
			/>
			<AlertDialog.Footer>
				<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action type="submit">Save</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>

<AlertDialog.Root bind:open={isTaskOpen}>
	<AlertDialog.Content class="flex max-h-2/3 flex-col">
		<AlertDialog.Header class="flex-shrink-0">
			<AlertDialog.Title>{task.title}</AlertDialog.Title>
		</AlertDialog.Header>

		{#if task.description && task.description.trim() !== ''}
			<div class="grow overflow-auto whitespace-pre-wrap">
				<AlertDialog.Description>
					{task.description}
				</AlertDialog.Description>
			</div>
		{/if}

		<AlertDialog.Footer class="flex-shrink-0">
			<AlertDialog.Action onclick={() => (isTaskOpen = false)}>OK</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
