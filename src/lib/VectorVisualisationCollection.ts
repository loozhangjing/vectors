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
		this.#points.set(point.name, { x: point.x, y: point.y } );
	}

	addVector(initialPoint: NamedPoint, terminalPoint: NamedPoint, vectorName: string) {
		if (!this.#points.has(initialPoint.name))
			this.#addPoint(initialPoint);
		if (!this.#points.has(terminalPoint.name))
			this.#addPoint(terminalPoint);

		// if the initial point is named 'A', the terminal point 'B',
		// and the vector 'c', the key will be 'A->B' and the value 'c'
		this.#directedEdges.set(
			initialPoint.name
			+ VectorVisualisationCollection.#pointNameSeparator
			+ terminalPoint.name,
			vectorName	
		);
		
		this.#two.makeLine(initialPoint.x, initialPoint.y, terminalPoint.x, terminalPoint.y);
	}
}
