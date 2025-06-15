<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Input } from './ui/input';
	import { Textarea } from './ui/textarea';
	import type { Task } from '$lib/server/task';
	import { Button } from './ui/button';
	import { Checkbox } from './ui/checkbox';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Trash from '@lucide/svelte/icons/trash';
	import Loader2Icon from '@lucide/svelte/icons/loader-2';
	import * as AlertDialog from './ui/alert-dialog';
	import { enhance } from '$app/forms';
	import { Label } from './ui/label';
	let { task }: { task: Task } = $props();
	let isEditOpen = $state(false);
	let isTaskOpen = $state(false);
	let isLoading = $state(false);

	async function updateTask(newCheckedState: boolean) {
		const response = await fetch('/api/task', {
			method: 'POST',
			body: JSON.stringify({ task, checked: newCheckedState, action: 0 }),
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
			body: JSON.stringify({ task, checked: Boolean(task.completed), action: 1 }),
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
	class="group hover:bg-muted/50 flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors duration-200"
	onclick={openTask}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Enter' && openTask()}
>
	<Checkbox
		class="h-4 w-4 flex-shrink-0"
		checked={Boolean(task.completed)}
		onCheckedChange={(checked) => updateTask(Boolean(checked))}
		onclick={handleCheckboxClick}
	/>

	<div class="min-w-0 flex-1 space-y-1">
		<p
			class="leading-tight font-medium {Boolean(task.completed)
				? 'text-muted-foreground line-through'
				: ''} truncate"
		>
			{task.title}
		</p>
		{#if task.description && task.description.trim() !== ''}
			<p class="text-muted-foreground line-clamp-2 text-sm leading-relaxed whitespace-pre-wrap">
				{task.description}
			</p>
		{/if}
	</div>

	<div
		class="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
	>
		<Button
			size="sm"
			variant="ghost"
			class="hover:bg-primary/10 hover:text-primary h-8 w-8 p-0"
			onclick={editTask}
			title="Edit task"
		>
			<Pencil size="14" />
		</Button>
		<Button
			size="sm"
			variant="ghost"
			class="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
			onclick={deleteTask}
			title="Delete task"
		>
			<Trash size="14" />
		</Button>
	</div>
</div>

<AlertDialog.Root bind:open={isEditOpen}>
	<AlertDialog.Content class="max-w-md">
		<AlertDialog.Header>
			<AlertDialog.Title>Edit Task</AlertDialog.Title>
			<AlertDialog.Description>Make changes to your task details below.</AlertDialog.Description>
		</AlertDialog.Header>
		<form
			action="?/updateTask"
			method="POST"
			use:enhance={() => {
				isLoading = true;

				return async ({ result, update }) => {
					isLoading = false;

					if (result.type === 'success') {
						isEditOpen = false;
						await update();
					}
				};
			}}
		>
			<input type="hidden" name="taskId" value={task.id} />
			<input type="hidden" name="checked" value={Boolean(task.completed) ? 'true' : 'false'} />
			<div class="space-y-4">
				<div class="space-y-2">
					<Label for="title">Title</Label>
					<Input
						value={task.title}
						name="title"
						id="title"
						type="text"
						required
						placeholder="Enter task title"
						class="focus:ring-primary/20 focus:ring-2"
					/>
				</div>
				<div class="space-y-2">
					<Label for="description">Description</Label>
					<Textarea
						class="focus:ring-primary/20 resize-none focus:ring-2"
						rows={4}
						value={task.description}
						name="description"
						id="description"
						placeholder="Enter task description (optional)"
					/>
				</div>
			</div>
			<AlertDialog.Footer class="mt-6">
				<AlertDialog.Cancel type="button">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action type="submit">
					{#if isLoading}
						<Loader2Icon class="animate-spin" />
						Please wait
					{:else}
						Save Changes
					{/if}
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>

<AlertDialog.Root bind:open={isTaskOpen}>
	<AlertDialog.Content class="flex max-h-[80vh] max-w-lg flex-col">
		<AlertDialog.Header class="flex-shrink-0 pb-4">
			<AlertDialog.Title class="pr-6 text-lg leading-tight font-semibold">
				{task.title}
			</AlertDialog.Title>
		</AlertDialog.Header>

		{#if task.description && task.description.trim() !== ''}
			<div class="-mx-1 flex-grow overflow-auto px-1 py-2">
				<AlertDialog.Description class="text-sm leading-relaxed whitespace-pre-wrap">
					{task.description}
				</AlertDialog.Description>
			</div>
		{:else}
			<div class="flex flex-grow items-center justify-center py-8">
				<p class="text-muted-foreground text-sm italic">No description provided</p>
			</div>
		{/if}

		<AlertDialog.Footer class="flex-shrink-0 pt-4">
			<AlertDialog.Action onclick={() => (isTaskOpen = false)} class="w-full sm:w-auto">
				Close
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
