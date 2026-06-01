<script lang='ts'>
	import { SvelteFlowProvider } from '@xyflow/svelte';
	import Flow from '$lib/Flow.svelte';
	import ResultPane from '$lib/ResultPane.svelte';
</script>

<SvelteFlowProvider>
	<div id='viewport'> 
		<Flow />
	</div>
	<div id='result-pane-container'>
		<ResultPane />
	</div>
</SvelteFlowProvider>

<style>
	:global(body) {
		margin: 0;
	}
	div#viewport {
		width: 100vw;
		height: 100vh;
	}
	div#result-pane-container {
		position: absolute;
		top: 0;
		right: 0;
		margin: 10px;
		padding: 10px;
		background-color: white;
		border: 2px solid black;
	}
</style>
