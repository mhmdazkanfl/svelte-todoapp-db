<script lang="ts">
	import { ScrollArea } from './ui/scroll-area';
	import { Separator } from './ui/separator';
	import TaskItem from './TaskItem.svelte';
	import type { Task } from '$lib/server/task';

	let { tasks }: { tasks: Task[] } = $props();
</script>

<ScrollArea class="h-72 w-full rounded-md border">
	<div class="p-4">
		{#each tasks as task (task.id)}
			<!-- <TaskItem {id} {title} description={'awdawd'}></TaskItem> -->
			<Separator></Separator>
			<TaskItem {task}></TaskItem>
			<Separator></Separator>
		{/each}
	</div>
</ScrollArea>
