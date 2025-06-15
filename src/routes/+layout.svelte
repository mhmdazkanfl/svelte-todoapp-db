<script lang="ts">
	import '../app.css';
	import { ModeWatcher, mode } from 'mode-watcher';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';

	import { Button } from '$lib/components/ui/button/index.js';
	let { children } = $props();
</script>

<Toaster theme={mode.current} position="bottom-right" richColors />
<ModeWatcher />

<div class="relative flex min-h-screen flex-col">
	<Button
		onclick={toggleMode}
		variant="outline"
		size="icon"
		class="fixed top-4 right-4 z-50 h-10 w-10 sm:h-11 sm:w-11"
	>
		<SunIcon
			class="h-4 w-4 scale-100 rotate-0 transition-all sm:h-[1.2rem] sm:w-[1.2rem] dark:scale-0 dark:-rotate-90"
		/>
		<MoonIcon
			class="absolute h-4 w-4 scale-0 rotate-90 transition-all sm:h-[1.2rem] sm:w-[1.2rem] dark:scale-100 dark:rotate-0"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>

	<main class="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
		<div class="w-full">
			{@render children()}
		</div>
	</main>
</div>
