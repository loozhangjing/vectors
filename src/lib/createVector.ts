import { type Node, type Edge, type XYPosition } from '@xyflow/svelte';

const NODE_RADIUS = 75;

export function createVector(
	sourceNodeID: string, position: XYPosition,
	currentNodes: Node[], currentEdges: Edge[]
) {
	let tailNode: Node | undefined;
	let tailNodeID: string;
	let edge: Edge;

	const intersectingNode = findNodeIntersectingCursor(position, currentNodes);

	if (intersectingNode !== undefined) {
		// don't return a node to prevent overwriting the existing node that's being intersected
		tailNode = undefined;
		tailNodeID = intersectingNode.id;
	} else {
		tailNodeID = findNextAvailableID(currentNodes);
		tailNode = {
			type: 'point',
			id: tailNodeID,
			position,
			data: {},
		};
	}

	edge = {
		type: 'vector',
		id: findNextAvailableID(currentEdges),
		source: sourceNodeID,
		target: tailNodeID,
	};

	return { tailNode, edge };
}

const distance = (pos1: XYPosition, pos2: XYPosition) =>
	Math.sqrt((pos2.x - pos1.x) ** 2 + (pos2.y - pos1.y) ** 2);

function findNodeIntersectingCursor(cursorPosition: XYPosition, nodes: Node[]) {
	let closestIntersectingNode: Node | undefined;

	for (const node of nodes) {
		const currentDistance = distance(cursorPosition, node.position);
		const closestFoundDistance = closestIntersectingNode === undefined ?
			Infinity :
			distance(cursorPosition, closestIntersectingNode.position);

		if (currentDistance < NODE_RADIUS && currentDistance < closestFoundDistance)
			closestIntersectingNode = node;
	}
	return closestIntersectingNode;
}

function findNextAvailableID(nodesOrEdges: Node[] | Edge[]) {
	const ids = nodesOrEdges.map(e => e.id);
	
	const isUppercase = ids[0].toUpperCase() === ids[0];

	const smallestCharCode = isUppercase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
	const largestCharCode = isUppercase ? 'Z'.charCodeAt(0) : 'z'.charCodeAt(0);

	let currentCharCode = ids[0].charCodeAt(0);

	while (currentCharCode <= largestCharCode) {
		const currentCharacter = String.fromCharCode(currentCharCode);

		if (ids.includes(currentCharacter) === false) return currentCharacter;

		currentCharCode++;
	}

	throw new Error('no available ID found');
}
