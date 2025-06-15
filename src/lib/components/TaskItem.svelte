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
	class="group hover:bg-muted/50 flex cursor-pointer items-start gap-3 px-3 py-3 transition-colors duration-200 sm:px-4 sm:py-4"
	onclick={openTask}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Enter' && openTask()}
>
	<Checkbox
		class="mt-0.5 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5"
		checked={Boolean(task.completed)}
		onCheckedChange={(checked) => updateTask(Boolean(checked))}
		onclick={handleCheckboxClick}
	/>

	<div class="min-w-0 flex-1 space-y-1">
		<p
			class="text-sm leading-tight font-medium sm:text-base {Boolean(task.completed)
				? 'text-muted-foreground line-through'
				: ''} break-words"
		>
			{task.title}
		</p>
		{#if task.description && task.description.trim() !== ''}
			<p
				class="text-muted-foreground line-clamp-2 text-xs leading-relaxed break-words whitespace-pre-wrap sm:text-sm"
			>
				{task.description}
			</p>
		{/if}
	</div>

	<div class="flex items-center gap-1">
		<div
			class="flex items-center gap-1 sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100"
		>
			<Button
				size="sm"
				variant="ghost"
				class="hover:bg-primary/10 hover:text-primary h-7 w-7 p-0 sm:h-8 sm:w-8"
				onclick={editTask}
				title="Edit task"
			>
				<Pencil class="h-3 w-3 sm:h-4 sm:w-4" />
			</Button>
			<Button
				size="sm"
				variant="ghost"
				class="hover:bg-destructive/10 hover:text-destructive h-7 w-7 p-0 sm:h-8 sm:w-8"
				onclick={deleteTask}
				title="Delete task"
			>
				<Trash class="h-3 w-3 sm:h-4 sm:w-4" />
			</Button>
		</div>
	</div>
</div>

<AlertDialog.Root bind:open={isEditOpen}>
	<AlertDialog.Content class="max-w-[calc(100vw-2rem)] sm:max-w-md">
		<AlertDialog.Header>
			<AlertDialog.Title class="text-lg sm:text-xl">Edit Task</AlertDialog.Title>
			<AlertDialog.Description class="text-muted-foreground text-sm sm:text-base">
				Make changes to your task details below.
			</AlertDialog.Description>
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
			<div class="space-y-4 py-4">
				<div class="space-y-2">
					<Label for="title" class="text-sm font-medium">Title</Label>
					<Input
						value={task.title}
						name="title"
						id="title"
						type="text"
						required
						placeholder="Enter task title"
						class="focus:ring-primary/20 text-sm focus:ring-2 sm:text-base"
					/>
				</div>
				<div class="space-y-2">
					<Label for="description" class="text-sm font-medium">Description</Label>
					<Textarea
						class="focus:ring-primary/20 min-h-[80px] resize-none text-sm focus:ring-2 sm:text-base"
						rows={3}
						value={task.description}
						name="description"
						id="description"
						placeholder="Enter task description (optional)"
					/>
				</div>
			</div>
			<AlertDialog.Footer class="flex flex-col-reverse gap-2 sm:flex-row sm:gap-3">
				<AlertDialog.Cancel type="button" class="flex-1 sm:flex-none">Cancel</AlertDialog.Cancel>
				<AlertDialog.Action type="submit" class="flex-1 sm:flex-none">
					{#if isLoading}
						<Loader2Icon class="mr-2 h-4 w-4 animate-spin" />
						Saving...
					{:else}
						Save Changes
					{/if}
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>

<AlertDialog.Root bind:open={isTaskOpen}>
	<AlertDialog.Content class="flex max-h-[80vh] max-w-[calc(100vw-2rem)] flex-col sm:max-w-lg">
		<AlertDialog.Header class="flex-shrink-0 pb-4">
			<AlertDialog.Title class="pr-6 text-base leading-tight font-semibold break-words sm:text-lg">
				{task.title}
			</AlertDialog.Title>
		</AlertDialog.Header>

		{#if task.description && task.description.trim() !== ''}
			<div class="-mx-1 flex-grow overflow-auto px-1 py-2">
				<AlertDialog.Description
					class="text-sm leading-relaxed break-words whitespace-pre-wrap sm:text-base"
				>
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
