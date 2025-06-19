<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
</script>

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
