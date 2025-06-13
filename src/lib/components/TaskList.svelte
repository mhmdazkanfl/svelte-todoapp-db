<script lang="ts">
	import { ScrollArea } from './ui/scroll-area';
	import { Separator } from './ui/separator';

	const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
</script>

<ScrollArea class="h-72 w-full rounded-md border">
	<div class="p-4">
		{#each tags as tag (tag)}
			<div class="text-sm">
				{tag}
			</div>
			<Separator class="my-2" />
		{/each}
	</div>
</ScrollArea>
