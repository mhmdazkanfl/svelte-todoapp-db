<script lang="ts">
	import { ScrollArea } from './ui/scroll-area';
	import { Separator } from './ui/separator';
	import TaskItem from './TaskItem.svelte';

	const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
	const id = '1';
	const title = 'Test';
</script>

<ScrollArea class="h-72 w-full rounded-md border">
	<div class="p-4">
		{#each tags as tag (tag)}
			<!-- <TaskItem {id} {title} description={'awdawd'}></TaskItem> -->
			<Separator></Separator>
			<TaskItem></TaskItem>
			<Separator></Separator>
		{/each}
	</div>
</ScrollArea>
