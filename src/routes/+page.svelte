<script lang='ts'>
	import { SvelteFlowProvider } from '@xyflow/svelte';
	import Flow from '$lib/Flow.svelte';
</script>

<div id='viewport'> 
	<SvelteFlowProvider>
		<Flow />
	</SvelteFlowProvider>
</div>

<style>
	:global(body) {
		margin: 0;
	}
	div#viewport {
		width: 100vw;
		height: 100vh;
	}
</style>
