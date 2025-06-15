<script lang="ts">
	import type { Task } from '$lib/server/task';
	import { Button } from './ui/button';
	import { Checkbox } from './ui/checkbox';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Trash from '@lucide/svelte/icons/trash';

	let { task }: { task: Task } = $props();
</script>

<div class="flex py-2">
	<Checkbox class="mr-3 h-4 w-4 flex-none self-center" />

	<div class="mr-3 flex w-full grow flex-col justify-center">
		<p>{task.title}</p>
		{#if task.description && task.description.trim() !== ''}
			<p class="text-muted-foreground text-sm">{task.description}</p>
		{/if}
	</div>

	<div class="flex flex-none items-center justify-center gap-2">
		<Button size="icon" class="size-8">
			<Pencil />
		</Button>
		<Button variant="destructive" size="icon" class="size-8">
			<Trash />
		</Button>
	</div>
</div>
