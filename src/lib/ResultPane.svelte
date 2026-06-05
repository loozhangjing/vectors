<script lang='ts'>
	import { useSvelteFlow, useNodeConnections } from '@xyflow/svelte';
	const { getNodes } = useSvelteFlow();

	let sourceNodeId = $state();
	let tailNodeId = $state();

	$effect(() => {
		const { current: currentConnections } = useNodeConnections({ id: sourceNodeId });

		const paths = [];

		for (const connection of currentConnections) {
			const nextNodeId = connection.source === sourceNodeId ? connection.target : connection.source;

			findPathToNodeRecursively('', sourceNodeId, nextNodeId, [sourceNodeId, nextNodeId]);
		}
		console.log(paths);

		function findPathToNodeRecursively(targetNodeId: string, previousNodeId: string, currentNodeId: string, currentPath: string[]) {
			const { current: connections } = useNodeConnections({ id: currentNodeId });

			if (connections.length <= 1) {
				paths.push(currentPath);
				return;
			}
			
			for (const connection of connections) {
				if (connection.source === previousNodeId || connection.target === previousNodeId) continue;
				const nextNodeId = connection.source === currentNodeId ? connection.target : connection.source;
				const nextPath = [...currentPath, nextNodeId]
				findPathToNodeRecursively(targetNodeId, currentNodeId, nextNodeId, nextPath);
			}
		}
	});
</script>

<div>
	<label for="sourceNodeSelect">Starting point:</label>
	<select id="sourceNodeSelect" bind:value={sourceNodeId}>
		{#each getNodes() as node}
			<option value={node.id}>{node.id}</option>
		{/each}
	</select>
</div>

<div>
	<label for="tailNodeSelect">Ending point:</label>
	<select id="tailNodeSelect" bind:value={tailNodeId}>
		{#each getNodes() as node}
			<option value={node.id}>{node.id}</option>
		{/each}
	</select>
</div>

<h2>Results</h2>
<style>
</style>
