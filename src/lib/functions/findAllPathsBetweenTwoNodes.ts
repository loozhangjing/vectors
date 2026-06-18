import { type NamedVector } from '$lib/types';
import DirectedGraph from "$lib/DirectedGraph";

export default function findAllPathsBetweenTwoNodes(
	directedGraph: DirectedGraph,
	initialNodeId: string,
	goalNodeId: string
) {
	const completePaths: NamedVector[][] = [];

	recurse(initialNodeId, []);

	return completePaths;

	function recurse(
		currentNodeId: string,
		visited: NamedVector[],
	) {
		// found a complete path from the initial node to the goal node
		if (currentNodeId === goalNodeId) {
			completePaths.push(visited);
			return;
		}

		// an array of `NamedVector` objects, which is
		// `{ name: string, headNodeId: string, tailNodeId: string }`,
		// where every `headNodeId` is the same as the `currentNodeId`,
		// while the `tailNodeId`s are the IDs of the nodes that are
		// directly connected to the current node (ID: `currentNodeId`)
		const frontierWithVisitedNodes = directedGraph.getConnections(currentNodeId);

		// remove nodes that have already been visited
		const frontier = frontierWithVisitedNodes.filter((frontierVector) => {
			const connectedNodeId = frontierVector.tailNodeId;

			for (const visitedVector of visited) {
				// this node in the frontier has already been visited
				if (visitedVector.headNodeId === connectedNodeId
					|| visitedVector.tailNodeId === connectedNodeId)
					return false;
			}

			// this node in the frontier has not been visited
			return true;
		});

		for (const vector of frontier) {
			const newCurrentNodeId = vector.tailNodeId;
			const newVisited = visited.concat(vector);

			recurse(newCurrentNodeId, newVisited);
		}
	}
}
