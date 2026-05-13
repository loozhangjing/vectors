import { useNodes, useEdges } from '@xyflow/svelte';
type useNodesHook = ReturnType<typeof useNodes>;
type useEdgesHook = ReturnType<typeof useEdges>;

let headNodeID: string;

export function beginAddingVector(x: number, y: number, useNodesHook: useNodesHook) {
	headNodeID = addPoint(x, y, useNodesHook);
}

export function finishAddingVector(
	x: number, y: number, useNodesHook: useNodesHook, useEdgesHook: useEdgesHook
) {
	const tailNodeID = addPoint(x, y, useNodesHook);

	addConnection(headNodeID, tailNodeID, useEdgesHook);
}

function addPoint(x: number, y: number, useNodesHook: useNodesHook) {
	const { current: currentNodes } = useNodesHook;

	// start point names with 'A'
	const newNodeID = String.fromCharCode((currentNodes.at(-1)?.id || '@').charCodeAt(0) + 1);

	const newNodes = currentNodes.concat({
		id: newNodeID,
		type: 'point',
		position: { x, y },
		data: { },
	});

	useNodesHook.set(newNodes);

	return newNodeID;
}

function addConnection(sourceNodeID: string, targetNodeID: string, useEdgesHook: useEdgesHook) {
	const { current: currentEdges } = useEdgesHook;

	// start edge names with 'p'
	const newEdgeID = String.fromCharCode((currentEdges.at(-1)?.id || 'o').charCodeAt(0) + 1);

	const newEdges = currentEdges.concat({
		id: newEdgeID,
		type: 'vector',
		source: sourceNodeID,
		target: targetNodeID,
	});

	useEdgesHook.set(newEdges);

	return newEdgeID;
}
