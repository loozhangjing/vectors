<script lang='ts'>
	import { 
		SvelteFlow, Background, ConnectionMode, useSvelteFlow, useNodes, useEdges,
		type Node, type Edge
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import PointNode from '$lib/PointNode.svelte';
	import VectorEdge from '$lib/VectorEdge.svelte';
	import { beginAddingVector, finishAddingVector } from '$lib/addVector';

	const nodeTypes = { point: PointNode };
	const edgeTypes = { vector: VectorEdge };

	let nodes: Node[] = $state.raw([]);
	let edges: Edge[] = $state.raw([]);

	// Svelte only allows these hooks to be defined during component initialisation
	const { screenToFlowPosition } = useSvelteFlow();
	const useNodesHook = useNodes();
	const useEdgesHook = useEdges();

	function handleMouseDown(ev: MouseEvent) {
		// convert clientX and clientY to viewport coordinates
		const { x, y } = screenToFlowPosition({ x: ev.clientX, y: ev.clientY });

		beginAddingVector(x, y, useNodesHook);
	}
	function handleMouseUp(ev: MouseEvent) {
		const { x, y } = screenToFlowPosition({ x: ev.clientX, y: ev.clientY });

		finishAddingVector(x, y, useNodesHook, useEdgesHook);
	}
</script>

<SvelteFlow
	bind:nodes
	bind:edges
	{nodeTypes}
	{edgeTypes}
	connectionMode={ConnectionMode.Loose}
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	panOnDrag={[1, 2]}
>
	<!-- a value of [1, 2] for panOnDrag allows the viewport to be panned on mouse drag --> 
	<!-- only when the middle or right mouse buttons are being held down -->
	<Background />
</SvelteFlow>
