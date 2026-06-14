<script lang='ts'>
	import { SvelteFlowProvider } from '@xyflow/svelte';
	import Flow from '$lib/Flow.svelte';
	import ResultPane from '$lib/ResultPane.svelte';
	import SelectionModePane from '$lib/SelectionModePane.svelte';

	let currentSelectionMode = $state('');
</script>

<SvelteFlowProvider>
	<div id='viewport'> 
		<Flow />
	</div>
	<div id='result-pane-container'>
		<ResultPane />
	</div>
	<div id='select-mode-container'>
		<SelectionModePane bind:selectedSelectionMode={currentSelectionMode} />
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
		left: 0;
		margin: 10px;
		padding: 10px;
		background-color: white;
		border: 2px solid black;
	}
	div#select-mode-container {
		position: absolute;
		top: 0;
		right: 0;
		margin: 10px;
	}
</style>
