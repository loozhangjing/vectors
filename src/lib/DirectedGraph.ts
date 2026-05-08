import { Vector } from 'two.js/src/vector';
import { type Coordinate, type NamedPoint } from './basicTypes';

export default class DirectedGraph {
	// 'A': { x: 42, y: -69 }
	#vertices: Map<string, Coordinate>;
	// 'A->B': 'x'
	#edges: Map<string, string>;

	constructor() {
		this.#vertices = new Map();
		this.#edges = new Map();
	}

	hasNamedVertex(vertex: NamedPoint) {
		const existingCoords = this.#vertices.get(vertex.name);
		if (existingCoords === undefined) return false;

		return existingCoords.x === vertex.x && existingCoords.y === vertex.y;
	}

	getEdgeName(headVertexName: string, tailVertexName: string) {
		return this.#edges.get(
			headVertexName + DirectedGraph.#VERTEX_NAME_SEPARATOR + tailVertexName
		);
	}

	addEdge(headVertex: NamedPoint, tailVertex: NamedPoint, edgeName: string) {
		if (this.getEdgeName(headVertex.name, tailVertex.name) !== undefined)
			throw new ReferenceError(
				`edge from vertex '${headVertex.name}' to '${tailVertex.name}' already exists`);

		const checkConflictingVertex = (vertex: NamedPoint) => {
			if (this.#vertices.has(vertex.name) === true
				&& this.hasNamedVertex(vertex) === false)
			throw new ReferenceError(`cannot add vertex ${JSON.stringify(vertex)}, vertex ${vertex.name} already exists at ${JSON.stringify(this.#vertices.get(vertex.name))}`);
		};

		checkConflictingVertex(headVertex);
		checkConflictingVertex(tailVertex);

		this.#vertices.set(headVertex.name, { x: headVertex.x, y: headVertex.y });
		this.#vertices.set(tailVertex.name, { x: tailVertex.x, y: tailVertex.y });
		this.#edges.set(
			headVertex.name + DirectedGraph.#VERTEX_NAME_SEPARATOR + tailVertex.name,
			edgeName
		);
	}

	edgeEntriesWithVertex(vertexName: string) {
		const entries = [];

		for (const [connection, edgeName] of this.#edges.entries()) {
			const [headVertexName, tailVertexName] = connection.split(
				DirectedGraph.#VERTEX_NAME_SEPARATOR);

			if (vertexName === headVertexName || vertexName === tailVertexName)
				entries.push([connection, edgeName, vertexName === headVertexName] as const);
		}

		return entries;
	}

	changeVertexName(oldName: string, newName: string) {
		const vertexCoords = this.#vertices.get(oldName);

		if (vertexCoords === undefined)
			throw new ReferenceError(`vertex '${oldName}' does not exist`);

		this.#vertices.delete(oldName);
		this.#vertices.set(newName, vertexCoords);

		for (const [connection, edgeName, isHead] of this.edgeEntriesWithVertex(oldName)) {
			const [headVertexName, tailVertexName] = connection.split(
				DirectedGraph.#VERTEX_NAME_SEPARATOR);

			this.#edges.delete(connection);

			const newConnection = isHead === true ?
				newName + DirectedGraph.#VERTEX_NAME_SEPARATOR + tailVertexName :
				headVertexName + DirectedGraph.#VERTEX_NAME_SEPARATOR + newName;
			this.#edges.set(newConnection, edgeName);
		}
	}

	changeEdgeName(headVertexName: string, tailVertexName: string, newEdgeName: string) {
		if (this.getEdgeName(headVertexName, tailVertexName) === undefined)
			throw new ReferenceError(
				`edge between vertex ${headVertexName} and ${tailVertexName} does not exist`);

		this.#edges.set(
			headVertexName + DirectedGraph.#VERTEX_NAME_SEPARATOR + tailVertexName,
			newEdgeName
		);
	}

	getVector(headVertexName: string, tailVertexName: string) {
		const headCoords = this.#vertices.get(headVertexName);
		const tailCoords = this.#vertices.get(tailVertexName);

		if (headCoords === undefined)
			throw new ReferenceError(`head vertex '${headVertexName}' does not exist`);
		if (tailCoords === undefined)
			throw new ReferenceError(`tail vertex '${tailVertexName}' does not exist`);

		return new Vector(
			tailCoords.x - headCoords.x,
			tailCoords.y - headCoords.y
		);
	}

	static #VERTEX_NAME_SEPARATOR = '->';
}
