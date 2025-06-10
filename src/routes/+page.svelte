<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';
</script>

<div class="mb-4 flex w-full max-w-sm flex-col">
	<h1 class="text-center text-xl font-bold">Welcome to Todo App</h1>
	<p class="text-muted-foreground text-center">by ts0ra</p>
</div>

<div class="flex w-full max-w-sm flex-col">
	<Button class="mb-2 w-1/2 self-center" onclick={() => goto('/login')} variant="outline"
		>Login</Button
	>
	<Button class="w-1/2 self-center" onclick={() => goto('/signup')}>Sign Up</Button>
</div>
