<script lang='ts'>
	import { useSvelteFlow } from '@xyflow/svelte';
	const { getEdges } = useSvelteFlow();
</script>

<div>
	<h2>Results</h2>
	{#each getEdges() as edge}
		<p><span class='squiggly-underline'>{edge.id}</span> = {edge.source}{edge.target}</p>
	{/each}
</div>

<style>
</style>
