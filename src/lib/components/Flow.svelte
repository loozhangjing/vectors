<script lang='ts'>
	import {
		SvelteFlow, Background, ConnectionMode, ConnectionLineType, useSvelteFlow,
		type Node, type Edge, type OnConnectEnd
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import { DEFAULT_NODES, DEFAULT_EDGES, NODE_TYPES, EDGE_TYPES } from '$lib/config';
	import { createVector } from '$lib/functions/createVector';

	let nodes: Node[] = $state.raw(DEFAULT_NODES);
	let edges: Edge[] = $state.raw(DEFAULT_EDGES);

	const { screenToFlowPosition } = useSvelteFlow();

	const handleConnectEnd: OnConnectEnd = (event, connectionState) => {
		const sourceNodeID = connectionState.fromNode?.id;
		
		if (!sourceNodeID) return console.log('no sourceNodeID, tail node creation aborted');

		// event can be a TouchEvent or a MouseEvent
		const { clientX, clientY } =
			'changedTouches' in event ? event.changedTouches[0] : event;

		const flowPosition = screenToFlowPosition({ x: clientX, y: clientY });

		const { tailNode, edge } = createVector(sourceNodeID, flowPosition, nodes, edges);

		if (tailNode !== undefined)
			nodes = [...nodes, tailNode];
		edges = [...edges, edge];
	};
</script>

<!-- a loose `connectionMode` allows connections between any two handles -->
<!-- (not necessarily from a source handle to a target handle) -->

<!-- `panOnDrag{[1, 2]}` allows the viewport to be panned on mouse drag --> 
<!-- only when the middle or right mouse buttons are being held down -->

<!-- setting the `onbeforeconnect` callback to return `false` prevents SvelteFlow from automatically -->
<!-- adding a connection when the mouse is released over an existing node -->
<!-- because the edge returned from `createVector()` is added manually to `edges` -->
<SvelteFlow
	bind:nodes
	bind:edges
	nodeTypes={NODE_TYPES}
	edgeTypes={EDGE_TYPES}
	connectionMode={ConnectionMode.Loose}
	connectionLineType={ConnectionLineType.Straight}
	panOnDrag={[1, 2]}
	onbeforeconnect={() => false}
	onconnectend={handleConnectEnd}
>
	<Background />
</SvelteFlow>
