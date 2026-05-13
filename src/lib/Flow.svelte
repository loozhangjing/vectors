<script lang='ts'>
	import { 
		SvelteFlow, Background, ConnectionMode, ConnectionLineType, useSvelteFlow,
		type Node, type Edge, type OnConnectEnd
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import PointNode from '$lib/PointNode.svelte';
	import VectorEdge from '$lib/VectorEdge.svelte';
	import { createVector } from '$lib/createVector';

	const nodeTypes = { point: PointNode };
	const edgeTypes = { vector: VectorEdge };

	let nodes: Node[] = $state.raw([
		{
			id: 'A',
			type: 'point',
			position: { x: 100, y: 100 },
			data: {}
		},
		{
			id: 'B',
			type: 'point',
			position: { x: 400, y: 400 },
			data: {}
		}
	]);
	let edges: Edge[] = $state.raw([
		{
			id: 'p',
			type: 'vector',
			source: 'A',
			target: 'B'
		}
	]);

	const { screenToFlowPosition } = useSvelteFlow();

	const handleConnectEnd: OnConnectEnd = (event, connectionState) => {
		const sourceNodeID = connectionState.fromNode?.id;
		
		if (!sourceNodeID) return console.log('no sourceNodeID, tail node creation aborted');

		// event can be a TouchEvent or a MouseEvent
		const { clientX, clientY } =
			'changedTouches' in event ? event.changedTouches[0] : event;

		const flowPosition = screenToFlowPosition({ x: clientX, y: clientY });

		const { tailNode, edge } = createVector(sourceNodeID, flowPosition, nodes, edges);

		nodes = [...nodes, tailNode];
		edges = [...edges, edge];
	};
</script>

<SvelteFlow
	bind:nodes
	bind:edges
	{nodeTypes}
	{edgeTypes}
	connectionMode={ConnectionMode.Loose}
	connectionLineType={ConnectionLineType.Straight}
	panOnDrag={[1, 2]}
	onconnectend={handleConnectEnd}
>
	<!-- a value of [1, 2] for panOnDrag allows the viewport to be panned on mouse drag --> 
	<!-- only when the middle or right mouse buttons are being held down -->
	<Background />
</SvelteFlow>
