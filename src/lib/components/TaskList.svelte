<script lang="ts">
	import { ScrollArea } from './ui/scroll-area';
	import { Separator } from './ui/separator';
	import TaskItem from './TaskItem.svelte';
	import FileText from '@lucide/svelte/icons/file-text';
	import type { Task } from '$lib/server/task';

	let { tasks }: { tasks: Task[] } = $props();
</script>

<ScrollArea class="h-72 w-full rounded-md border">
	<div class="h-full w-full p-4">
		{#if tasks.length === 0}
			<div class="text-muted-foreground flex h-full flex-col items-center justify-center">
				<FileText class="mb-2" size="68" />
				<p>No tasks available</p>
			</div>
		{:else}
			{#each tasks as task (task.id)}
				<Separator></Separator>
				<TaskItem {task}></TaskItem>
				<Separator></Separator>
			{/each}
		{/if}
	</div>
</ScrollArea>
