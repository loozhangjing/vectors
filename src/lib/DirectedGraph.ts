import { type Node, type Edge } from '@xyflow/svelte';
import { type NamedVector } from './types';

export default class DirectedGraph {
	#nodes: Node[];
	#edges: Edge[];

	constructor({ nodes, edges }: { nodes: Node[], edges: Edge[] }) {
		this.#nodes = nodes;
		this.#edges = edges;
	}

	hasNode(nodeId: string) {
		return this.#nodes.some((node) => node.id === nodeId);
	}

	getConnections(nodeId: string) {
		if (!this.hasNode(nodeId))
			throw new Error(`node ${nodeId} does not exist`);

		const connections: NamedVector[] = [];

		for (const edge of this.#edges) {
			// let's say nodeId is A, the id of the connected node is B, and the vector is named x
			if (edge.source === nodeId)
				// here, A is edge.source, and A -> B would be x
				connections.push({
					headNodeId: nodeId,
					tailNodeId: edge.target,
					name: edge.id,
				});
			else if (edge.target === nodeId)
				// here, A is edge.target, and B -> A would be x, so AB = -x
				connections.push({
					headNodeId: nodeId,
					tailNodeId: edge.source,
					name: `-${edge.id}`,
				});
		}

		return connections;
	}
}
