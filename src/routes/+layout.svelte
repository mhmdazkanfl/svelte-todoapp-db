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

<div class="flex min-h-screen flex-col items-center justify-center">
	<Button onclick={toggleMode} variant="outline" size="icon" class="absolute top-4 right-4">
		<SunIcon
			class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
		/>
		<MoonIcon
			class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>

	{@render children()}
</div>
