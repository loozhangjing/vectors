<script lang='ts'>
	import { SvelteFlow, Background, ConnectionMode, type Node, type Edge } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import PointNode from '$lib/PointNode.svelte';
	
	const nodeTypes = { point: PointNode };

	let nodes: Node[] = $state.raw([]);

	let edges: Edge[] = $state.raw([]);

	let headNodeID: string;
	function addPoint(x: number, y: number) {
		// start point names with 'A'
		const id = String.fromCharCode((nodes.at(-1)?.id || '@').charCodeAt(0) + 1);
		nodes = nodes.concat({
			id,
			type: 'point',
			position: { x, y },
			data: { },
		});

		return id;
	}
	function startAddingVector(ev: MouseEvent) {
		headNodeID = addPoint(ev.clientX, ev.clientY);
	}
	function finishAddingVector(ev: MouseEvent) {
		const tailNodeID = addPoint(ev.clientX, ev.clientY);

		// start point names with 'p'
		const edgeID = String.fromCharCode((edges.at(-1)?.id || 'o').charCodeAt(0) + 1);
		edges = edges.concat({
			id: edgeID,
			type: 'straight',
			source: headNodeID,
			target: tailNodeID
		});
	}
</script>

<div id='viewport'> 
	<SvelteFlow
		bind:nodes
		bind:edges
		{nodeTypes}
		connectionMode={ConnectionMode.Loose}
		onmousedown={startAddingVector}
		onmouseup={finishAddingVector}
		panOnDrag={[1, 2]}
	>
		<!-- a value of [1, 2] for panOnDrag allows the viewport to be panned on mouse drag --> 
		<!-- only when the middle or right mouse buttons are being held down -->
		<Background />
	</SvelteFlow>
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
