<script lang="ts">
	import { ScrollArea } from './ui/scroll-area';
	import { Separator } from './ui/separator';
	import TaskItem from './TaskItem.svelte';
	import FileText from '@lucide/svelte/icons/file-text';
	import type { Task } from '$lib/server/task';

	let { tasks }: { tasks: Task[] } = $props();
</script>

<ScrollArea class="h-80 w-full rounded-lg border shadow-sm">
	<div class="h-full w-full">
		{#if tasks.length === 0}
			<div class="text-muted-foreground flex h-full flex-col items-center justify-center p-8">
				<div class="bg-muted/50 mb-4 rounded-full p-4">
					<FileText size="32" class="text-muted-foreground/60" />
				</div>
				<h3 class="mb-1 text-base font-medium">No tasks found</h3>
				<p class="text-center text-sm">Create your first task to get started</p>
			</div>
		{:else}
			<div class="divide-border divide-y">
				{#each tasks as task (task.id)}
					<TaskItem {task}></TaskItem>
				{/each}
			</div>
		{/if}
	</div>
</ScrollArea>
