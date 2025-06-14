<script lang="ts">
	import { Button } from './ui/button';
	import { Checkbox } from './ui/checkbox';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Trash from '@lucide/svelte/icons/trash';
	import { cn } from '$lib/utils';

	interface Props {
		id: string;
		title: string;
		description?: string;
		completed?: boolean;
		onToggle?: (id: string) => void;
		onEdit?: (id: string) => void;
		onDelete?: (id: string) => void;
	}

	let {
		id,
		title,
		description = '',
		completed = $bindable(false),
		onToggle,
		onEdit,
		onDelete
	}: Props = $props();

	let isHovered = $state(false);
</script>

<div
	class={cn(
		'group flex items-center gap-3 rounded-lg border p-4 transition-all duration-200 ease-in-out',
		'hover:border-primary/20 hover:bg-accent/30 hover:shadow-md',
		completed && 'bg-muted/30 opacity-70'
	)}
	role="listitem"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	<!-- Checkbox with better touch target -->
	<div class="flex-shrink-0">
		<Checkbox
			bind:checked={completed}
			onCheckedChange={() => onToggle?.(id)}
			class="data-[state=checked]:bg-primary data-[state=checked]:border-primary h-5 w-5"
			aria-label={completed ? `Mark "${title}" as incomplete` : `Mark "${title}" as complete`}
		/>
	</div>

	<!-- Content area with proper spacing -->
	<div class="min-w-0 flex-1 space-y-1">
		<h3
			class={cn(
				'text-sm leading-tight font-medium transition-all duration-200',
				completed && 'text-muted-foreground line-through'
			)}
		>
			{title}
		</h3>

		{#if description}
			<p
				class={cn(
					'text-muted-foreground line-clamp-2 text-xs transition-all duration-200',
					completed && 'line-through opacity-60'
				)}
			>
				{description}
			</p>
		{/if}
	</div>

	<!-- Action buttons with improved UX -->
	<div
		class={cn(
			'flex items-center gap-1 transition-all duration-200 ease-in-out',
			'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
			isHovered && 'translate-x-0 opacity-100'
		)}
	>
		<Button
			variant="ghost"
			size="icon"
			class="hover:bg-primary/10 hover:text-primary h-8 w-8"
			onclick={() => onEdit?.(id)}
			aria-label={`Edit "${title}"`}
		>
			<Pencil class="h-4 w-4" />
		</Button>

		<Button
			variant="ghost"
			size="icon"
			class="hover:bg-destructive/10 hover:text-destructive h-8 w-8"
			onclick={() => onDelete?.(id)}
			aria-label={`Delete "${title}"`}
		>
			<Trash class="h-4 w-4" />
		</Button>
	</div>
</div>

<style>
	/* Custom line-clamp utility if not available in your CSS */
	.line-clamp-2 {
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
