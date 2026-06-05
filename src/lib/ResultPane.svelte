<script lang='ts'>
	interface NamedVector {
		name: string,
		headNodeId: string,
		tailNodeId: string,
	}

	import { useSvelteFlow, useNodeConnections } from '@xyflow/svelte';
	const { getNodes } = useSvelteFlow();

	let sourceNodeId = $state('A');
	let tailNodeId = $state('B');

	$effect(() => {
		const { current: sourceNodeConnections } = useNodeConnections({ id: sourceNodeId });

		const paths: NamedVector[][] = [];

		for (const connection of sourceNodeConnections) {
			// the source and target nodes of a NodeConnection object don't necessarily correspond to
			// the head and tail nodes of the vector in the direction we're going
			const nextNodeId = connection.source === sourceNodeId ? connection.target : connection.source;

			const nextPath = [{
				name: connection.edgeId,
				headNodeId: sourceNodeId,
				tailNodeId: nextNodeId,
			}];

			// if the source node and tail node are connected (share an edge)
			if (nextNodeId === tailNodeId) {
				paths.push(nextPath);
				continue;
			}

			findPathToNodeRecursively(tailNodeId, nextPath);
		}

		console.log(paths);

		function findPathToNodeRecursively(targetNodeId: string, currentPath: NamedVector[]) {
			const previousVector = currentPath.at(-1);

			if (!previousVector) throw new Error("`currentPath` is empty");

			const { headNodeId: prevHeadNodeId, tailNodeId: prevTailNodeId } = previousVector;
			const { current: connections } = useNodeConnections({ id: prevTailNodeId });

			// upon reaching a leaf node (at which point the only direction to go is back), stop traversing
			if (connections.length <= 1) return;

			for (const connection of connections) {
				// don't traverse in the direction we came from
				if (connection.source === prevHeadNodeId || connection.target === prevHeadNodeId) continue;

				const nextTailNodeId = connection.source === prevTailNodeId ? connection.target : connection.source;
				const nextVector = {
					name: connection.edgeId,
					headNodeId: prevTailNodeId,
					tailNodeId: nextTailNodeId,
				};
				const nextPath = [...currentPath, nextVector]

				if (nextTailNodeId === targetNodeId) {
					paths.push(nextPath);
					return;
				}
				findPathToNodeRecursively(targetNodeId, nextPath);
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
