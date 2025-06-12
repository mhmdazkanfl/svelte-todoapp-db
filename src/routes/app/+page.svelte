<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="?/logout" use:enhance>
	<Button type="submit">Log out</Button>
</form>
