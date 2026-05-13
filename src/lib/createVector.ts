import { type Node, type Edge, type XYPosition } from '@xyflow/svelte';

export function createVector(
	sourceNodeID: string, position: XYPosition,
	currentNodes: Node[], currentEdges: Edge[]
) {
	const tailNodeID = findNextAvailableID(currentNodes);

	const tailNode: Node = {
		type: 'point',
		id: tailNodeID,
		position,
		data: { },
	};

	const edge: Edge = {
		type: 'vector',
		id: findNextAvailableID(currentEdges),
		source: sourceNodeID,
		target: tailNodeID,
	};

	return { tailNode, edge };
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
