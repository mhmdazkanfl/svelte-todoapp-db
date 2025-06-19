<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Badge } from '$lib/components/ui/badge';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import Search from '@lucide/svelte/icons/search';
	import Loader2Icon from '@lucide/svelte/icons/loader-2';
	import { enhance } from '$app/forms';
	import TaskList from '$lib/components/TaskList.svelte';
	import { toast } from 'svelte-sonner';

	let { data } = $props();

	let isLoading = $state(false);
	let addForm: HTMLFormElement;
	let searchQuery = $state('');

	let filteredTasks = $derived.by(() => {
		if (!searchQuery.trim()) {
			return data.tasks;
		}

		const query = searchQuery.toLowerCase().trim();
		return data.tasks.filter(
			(task) =>
				task.title.toLowerCase().includes(query) ||
				(task.description && task.description.toLowerCase().includes(query))
		);
	});

	// Constants
	const pageTitle = 'Todo-App by Muhammad Azka Naufal';
	const pageDescription =
		'A modern, full-stack todo application built with Svelte 5, SvelteKit, and SQLite. Features authentication, task management, and beautiful UI with dark mode support.';
	const siteName = 'Todo-App';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta
		name="keywords"
		content="Todo App, Todo, App, Svelte 5, SvelteKit, Task Management, Management "
	/>
	<meta property="og:image" content="{data.origin}/logo.jpg" />
	<meta name="twitter:image" content="{data.origin}/logo.jpg" />
	<meta name="twitter:image:alt" content="Todo-App Logo" />
	<meta name="author" content="Muhammad Azka Naufal" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={data.origin} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="en_US" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href={data.origin} />
	<meta name="application-name" content={siteName} />
	<meta name="generator" content="SvelteKit" />
	<meta name="license" content="MIT" />
	<meta name="color-scheme" content="dark" />
	<meta name="theme-color" content="#13111C" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="robots" href="{data.origin}/robots.txt" />
</svelte:head>

<div class="fixed top-4 left-4 z-40">
	<form method="POST" action="?/logout" use:enhance>
		<Button type="submit" size="sm" class="text-xs sm:text-sm">Log out</Button>
	</form>
</div>

<div class="mx-auto w-full max-w-7xl">
	<Card.Root class="mx-auto mb-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
		<Card.Header class="text-center">
			<Card.Title class="text-lg sm:text-xl md:text-2xl">Add new task</Card.Title>
		</Card.Header>
		<Card.Content>
			<form
				bind:this={addForm}
				id="add-form"
				action="?/addTask"
				method="POST"
				use:enhance={() => {
					isLoading = true;

					return async ({ result, update }) => {
						isLoading = false;

						if (result.type === 'success') {
							toast.success((result.data?.message as string) || 'Task added successfully!');

							addForm.reset();
						} else if (result.type === 'failure') {
							toast.error((result.data?.message as string) || 'Failed to add task');
						}

						await update();
					};
				}}
			>
				<div class="space-y-4">
					<Input
						id="title"
						type="text"
						name="title"
						placeholder="Task title..."
						required
						class="text-sm sm:text-base"
					/>
					<Textarea
						class="min-h-[80px] resize-none text-sm sm:text-base"
						id="description"
						name="description"
						placeholder="Task description (optional)..."
						rows={3}
					/>
				</div>
			</form>
		</Card.Content>
		<Card.Footer>
			<Button
				type="submit"
				form="add-form"
				disabled={isLoading}
				class="w-full text-sm sm:text-base"
			>
				{#if isLoading}
					<Loader2Icon class="mr-2 h-4 w-4 animate-spin" />
					Adding task...
				{:else}
					Add Task
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>

	<div class="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
		<Tabs.Root value="all" class="w-full">
			<Tabs.List class="mb-4 grid w-full grid-cols-3">
				<Tabs.Trigger value="all" class="flex items-center gap-1 text-xs sm:text-sm">
					<span class="hidden sm:inline">All Tasks</span>
					<span class="sm:hidden">All</span>
					<Badge
						class="h-4 min-w-4 rounded-full px-1 font-mono text-[10px] sm:h-5 sm:min-w-5 sm:text-xs"
					>
						{data.tasks.length}
					</Badge>
				</Tabs.Trigger>
				<Tabs.Trigger value="active" class="flex items-center gap-1 text-xs sm:text-sm">
					<span class="hidden sm:inline">Active</span>
					<span class="sm:hidden">Active</span>
					<Badge
						class="h-4 min-w-4 rounded-full bg-blue-600 px-1 font-mono text-[10px] text-white sm:h-5 sm:min-w-5 sm:text-xs dark:bg-blue-500"
					>
						{data.tasks.filter((task) => !task.completed).length}
					</Badge>
				</Tabs.Trigger>
				<Tabs.Trigger value="completed" class="flex items-center gap-1 text-xs sm:text-sm">
					<span class="hidden sm:inline">Completed</span>
					<span class="sm:hidden">Done</span>
					<Badge
						variant="destructive"
						class="h-4 min-w-4 rounded-full px-1 font-mono text-[10px] sm:h-5 sm:min-w-5 sm:text-xs"
					>
						{data.tasks.filter((task) => task.completed).length}
					</Badge>
				</Tabs.Trigger>
			</Tabs.List>

			<div class="relative mb-4">
				<Search class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
				<Input
					placeholder="Search tasks..."
					class="pl-10 text-sm sm:text-base"
					bind:value={searchQuery}
				/>
			</div>

			<Tabs.Content value="all">
				<TaskList tasks={filteredTasks} />
			</Tabs.Content>
			<Tabs.Content value="active">
				<TaskList tasks={filteredTasks.filter((task) => !task.completed)} />
			</Tabs.Content>
			<Tabs.Content value="completed">
				<TaskList tasks={filteredTasks.filter((task) => task.completed)} />
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
