<script lang='ts'>
	import {
		SvelteFlow, Background, ConnectionMode, ConnectionLineType, useSvelteFlow,
		type OnConnectEnd
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import PointNode from '$lib/components/PointNode.svelte';
	import VectorEdge from '$lib/components/VectorEdge.svelte';
	import { createVector } from '$lib/functions/createVector';
	import GlobalState from '$lib/GlobalState.svelte';

	const NODE_TYPES = { point: PointNode };
	const EDGE_TYPES = { vector: VectorEdge };

	const { screenToFlowPosition } = useSvelteFlow();

	const handleConnectEnd: OnConnectEnd = (event, connectionState) => {
		const sourceNodeID = connectionState.fromNode?.id;
		
		if (!sourceNodeID) return console.log('no sourceNodeID, tail node creation aborted');

		// event can be a TouchEvent or a MouseEvent
		const { clientX, clientY } =
			'changedTouches' in event ? event.changedTouches[0] : event;

		const flowPosition = screenToFlowPosition({ x: clientX, y: clientY });

		const { tailNode, edge } = createVector(sourceNodeID, flowPosition, GlobalState.nodes, GlobalState.edges);

		if (tailNode !== undefined)
			GlobalState.nodes = [...GlobalState.nodes, tailNode];
		GlobalState.edges = [...GlobalState.edges, edge];
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
	bind:nodes={GlobalState.nodes}
	bind:edges={GlobalState.edges}
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
