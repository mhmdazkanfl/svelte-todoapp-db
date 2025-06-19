<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	let { data } = $props();

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

<div class="mx-auto w-full max-w-sm sm:max-w-md">
	<div class="mb-8 text-center">
		<h1
			class="from-primary to-primary/70 mb-2 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-4xl"
		>
			Welcome to Todo App
		</h1>
		<p class="text-muted-foreground text-sm sm:text-base">
			Stay organized and boost your productivity
		</p>
		<p class="text-muted-foreground/70 mt-1 text-xs sm:text-sm">by Muhammad Azka Naufal</p>
	</div>

	<div class="space-y-3 sm:space-y-4">
		<Button
			class="w-full text-sm font-medium sm:text-base"
			href="/login"
			variant="outline"
			size="lg"
		>
			Sign In to Your Account
		</Button>
		<Button class="w-full text-sm font-medium sm:text-base" href="/signup" size="lg">
			Create New Account
		</Button>
	</div>

	<div class="mt-12 space-y-4">
		<h2 class="text-muted-foreground text-center text-lg font-semibold sm:text-xl">Features</h2>
		<div class="grid gap-3 text-center">
			<div class="bg-muted/50 rounded-lg p-3">
				<p class="text-sm font-medium sm:text-base">✓ Create and manage tasks</p>
			</div>
			<div class="bg-muted/50 rounded-lg p-3">
				<p class="text-sm font-medium sm:text-base">✓ Track completion status</p>
			</div>
			<div class="bg-muted/50 rounded-lg p-3">
				<p class="text-sm font-medium sm:text-base">✓ Search and filter tasks</p>
			</div>
		</div>
	</div>
</div>
