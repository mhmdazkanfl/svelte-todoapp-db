<script lang="ts">
	import { Button } from './ui/button';
	import { Checkbox } from './ui/checkbox';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Trash from '@lucide/svelte/icons/trash';
</script>

<div class="flex py-2">
	<Checkbox class="mr-3 h-4 w-4 self-center" />

	<div class="">
		<p>Title</p>
		<p class="text-muted-foreground">Description</p>
	</div>

	<div class="flex w-full items-center justify-end gap-2">
		<Button size="icon" class="size-8">
			<Pencil />
		</Button>
		<Button variant="destructive" size="icon" class="size-8">
			<Trash />
		</Button>
	</div>
</div>
