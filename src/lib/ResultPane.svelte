<script lang='ts'>
	interface NamedVector {
		name: string,
		headNodeId: string,
		tailNodeId: string,
	}
	
	import { untrack } from 'svelte';
	import { useSvelteFlow, useNodeConnections } from '@xyflow/svelte';
	import { typesetMathJaxAttachment } from './utils';
	const { getNodes } = useSvelteFlow();

	let sourceNodeId = $state('A');
	let tailNodeId = $state('B');
	let paths: NamedVector[][] = $state([]);

	$effect(() => {
		console.log('---', 'STARTING POINT OR ENDING POINT WAS CHANGED', '---');
		const { current: sourceNodeConnections } = useNodeConnections({ id: sourceNodeId });

		// all references to the `paths` variable must be inside an `untrack()`, so that changes to
		// `paths` aren't tracked, or else this whole $effect function would run again
		untrack(() => paths = []);

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
				untrack(() => paths.push(nextPath));
				continue;
			}

			findPathToNodeRecursively(tailNodeId, nextPath);
		}

		function findPathToNodeRecursively(targetNodeId: string, currentPath: NamedVector[]) {
			const previousVector = currentPath.at(-1);

			if (!previousVector) throw new Error("`currentPath` is empty");

			const { tailNodeId: prevTailNodeId } = previousVector;
			const { current: connections } = useNodeConnections({ id: prevTailNodeId });

			console.log('>>>', 'current path:', pathToDebugText(currentPath));
			for (const connection of connections) {
				const nextTailNodeId = connection.source === prevTailNodeId ? connection.target : connection.source;

				const nextNodeAlreadyTraversed = nodeExistsInVectorArray(nextTailNodeId, currentPath);
				console.log(nextTailNodeId, 'exists in the current path:', nextNodeAlreadyTraversed);

				// don't go down a path already taken before to prevent infinite recursion
				if (nextNodeAlreadyTraversed === true) continue;

				console.log('continuing path with node', nextTailNodeId, '...');

				const nextVector = {
					name: connection.edgeId,
					headNodeId: prevTailNodeId,
					tailNodeId: nextTailNodeId,
				};
				const nextPath = [...currentPath, nextVector];

				// found a complete path to the target node
				if (nextTailNodeId === targetNodeId) {
					untrack(() => {
						paths.push(nextPath);
					});
					continue;
				}

				findPathToNodeRecursively(targetNodeId, nextPath);
			}
		}
	});

	function nodeExistsInVectorArray(nodeId: string, path: NamedVector[]) {
		for (const vector of path) {
			if (vector.headNodeId === nodeId || vector.tailNodeId === nodeId) return true;
		}
		return false;
	}

	// for logging purposes only
	function pathToDebugText(path: NamedVector[]) {
		const nodes = [path[0].headNodeId];
		for (const vector of path) {
			nodes.push(vector.tailNodeId);
		}
		return nodes.join(' -> ');
	}
</script>

<div id='source-and-tail-node-select-container'>
	<label for="sourceNodeSelect">Starting point:</label>
	<select id="sourceNodeSelect" bind:value={sourceNodeId}>
		{#each getNodes() as node}
			<option value={node.id}>{node.id}</option>
		{/each}
	</select>

	<label for="tailNodeSelect">Ending point:</label>
	<select id="tailNodeSelect" bind:value={tailNodeId}>
		{#each getNodes() as node}
			<option value={node.id}>{node.id}</option>
		{/each}
	</select>
</div>

<h2>Results</h2>
<ul>
	<!-- "Key blocks destroy and recreate their contents when the value of an expression changes." - Svelte docs -->
	<!-- the mathematics previously typeset by MathJax will be removed every time `paths` is updated -->
	{#key paths}
	{#each paths as path}
		<li {@attach typesetMathJaxAttachment}>$$
			<!-- use the 'aligned' environment to align all equal signs preceded by an ampersand (&) -->
			\begin{'{'}aligned{'}'}

			<!-- prevent the curly braces meant to be LaTeX from being misinterpreted by Svelte -->
			<!-- by putting them inside JavaScript strings -->
			\overrightarrow{'{'}{sourceNodeId}{tailNodeId}{'}'}

			&= {#each path as namedVector, index}
				\overrightarrow{'{'}{namedVector.headNodeId}{namedVector.tailNodeId}{'}'}
				{#if index < path.length - 1}+{/if}
			{/each}

			\newline

			&= {#each path as namedVector, index}
				\underset{'{'}\sim{'}'}{'{'}{namedVector.name}{'}'}
				{#if index < path.length - 1}+{/if}
			{/each}
			\end{'{'}aligned{'}'}
		$$</li>
	{/each}
	{/key}
</ul>

<style>
	#source-and-tail-node-select-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5px 10px;
		align-items: center;
	}
	select, option {
		font-family: 'Luciole';
		font-size: 1rem;
		padding: 5px 10px;
		border: 1.5px solid black;
		border-radius: 0;
	}
	select:hover {
		cursor: pointer;
	}
</style>
