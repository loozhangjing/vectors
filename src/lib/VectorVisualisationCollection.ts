import Two from 'two.js';
import { type Coordinate, type NamedPoint } from "./basicTypes";

export default class VectorVisualisationCollection {
	static #pointNameSeparator = "->";

	#two: Two;
	// the string name of each point is unique
	#points: Map<string, Coordinate>;
	// key: connections between points
	// value: name of the vector that represents that connection
	#directedEdges: Map<string, string>;

	constructor(canvasElement: HTMLCanvasElement) {
		this.#two = new Two({
			fullscreen: true,
			domElement: canvasElement,
			autostart: true,
		});
		this.#points = new Map();
		this.#directedEdges = new Map();
	}

	#addPoint(point: NamedPoint) {
		if (this.#points.has(point.name))
			throw Error(`point ${point.name} already exists`);

		this.#points.set(point.name, { x: point.x, y: point.y } );
	}

	#addEdge(initialPointName: string, terminalPointName: string, edgeName: string) {
		// if the initial point is named 'A', the terminal point 'B',
		// and the vector 'c', the key will be 'A->B' and the value 'c'
		const edgeID =
			initialPointName
			+ VectorVisualisationCollection.#pointNameSeparator
			+ terminalPointName;
		if (this.#directedEdges.has(edgeID)) throw Error(`edge ${edgeID} already exists`);

		this.#directedEdges.set(edgeID, edgeName);
	}

	addVector(initialPoint: NamedPoint, terminalPoint: NamedPoint, vectorName: string) {
		this.#addPoint(initialPoint);
		this.#addPoint(terminalPoint);

		this.#addEdge(initialPoint.name, terminalPoint.name, vectorName);

		this.#two.makeLine(initialPoint.x, initialPoint.y, terminalPoint.x, terminalPoint.y);
	}
}
