<script lang="ts">
	import { ScrollArea } from './ui/scroll-area';
	import { Separator } from './ui/separator';
	import TaskItem from './TaskItem.svelte';
	import FileText from '@lucide/svelte/icons/file-text';
	import type { Task } from '$lib/server/task';

	let { tasks }: { tasks: Task[] } = $props();
</script>

<ScrollArea class="h-[300px] w-full rounded-lg border shadow-sm sm:h-80 md:h-96">
	<div class="h-full w-full">
		{#if tasks.length === 0}
			<div
				class="text-muted-foreground flex h-full flex-col items-center justify-center p-4 sm:p-8"
			>
				<div class="bg-muted/50 mb-3 rounded-full p-3 sm:mb-4 sm:p-4">
					<FileText size="24" class="text-muted-foreground/60 sm:h-8 sm:w-8" />
				</div>
				<h3 class="mb-1 text-sm font-medium sm:text-base">No tasks found</h3>
				<p class="text-muted-foreground/80 text-center text-xs sm:text-sm">
					Create your first task to get started
				</p>
			</div>
		{:else}
			<div class="divide-border divide-y">
				{#each tasks as task (task.id)}
					<TaskItem {task} />
				{/each}
			</div>
		{/if}
	</div>
</ScrollArea>
