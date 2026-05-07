import Two from 'two.js';
import { Vector } from 'two.js/src/vector';
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

	static #getEdgeID(initialPointName: string, terminalPointName: string) {
		return initialPointName
			+ VectorVisualisationCollection.#pointNameSeparator
			+ terminalPointName;
	}

	#addPoint(point: NamedPoint) {
		if (this.#points.has(point.name))
			throw Error(`point ${point.name} already exists`);

		this.#points.set(point.name, { x: point.x, y: point.y } );
	}

	#addEdge(initialPointName: string, terminalPointName: string, edgeName: string) {
		// if the initial point is named 'A', the terminal point 'B',
		// and the vector 'c', the key will be 'A->B' and the value 'c'
		const edgeID = VectorVisualisationCollection.#getEdgeID(
			initialPointName, terminalPointName
		);
		if (this.#directedEdges.has(edgeID)) throw Error(`edge ${edgeID} already exists`);

		this.#directedEdges.set(edgeID, edgeName);
	}

	#vectorNameBetweenNamedPoints(initialPointName: string, terminalPointName: string) {
		const edgeID = VectorVisualisationCollection.#getEdgeID(
			initialPointName, terminalPointName
		);

		return this.#directedEdges.get(edgeID);
	}

	vectorBetweenNamedPoints(initialPointName: string, terminalPointName: string) {
		if (!this.#points.has(initialPointName))
			throw Error(`initial point ${initialPointName} does not exist`);
		if (!this.#points.has(terminalPointName))
			throw Error(`terminal point ${terminalPointName} does not exist`);

		// '!' at the end tells TypeScript it exists
		const { x: x1, y: y1 } = this.#points.get(initialPointName)!;
		const { x: x2, y: y2 } = this.#points.get(terminalPointName)!;
		return new Vector(
			x2 - x1,
			y2 - y1
		);
	}

	addVector(initialPoint: NamedPoint, terminalPoint: NamedPoint, vectorName: string) {
		this.#addPoint(initialPoint);
		this.#addPoint(terminalPoint);

		this.#addEdge(initialPoint.name, terminalPoint.name, vectorName);

		const { x: x1, y: y1 } = initialPoint;
		const { x: x2, y: y2 } = terminalPoint;

		this.#two.makeLine(x1, y1, x2, y2);

		const unitVector = this.vectorBetweenNamedPoints(
			initialPoint.name, terminalPoint.name
		).setLength(1);
		const xOffset = unitVector.x * 15;
		const yOffset = unitVector.y * 15;

		this.#two.makeText(initialPoint.name, x1 - xOffset, y1 - yOffset, { size: 24 });
		this.#two.makeText(terminalPoint.name, x2 + xOffset, y2 + yOffset, { size: 24 });

		// rotate 90 degrees (pi / 2 radians)
		const unitPerpendicularVector = unitVector.rotate(Math.PI / 2);
		const perpendicularXOffset = unitPerpendicularVector.x * 15;
		const perpendicularYOffset = unitPerpendicularVector.y * 15;

		const midpointX = (x1 + x2) / 2;
		const midpointY = (y1 + y2) / 2;
		this.#two.makeText(
			vectorName,
			midpointX - perpendicularXOffset,
			midpointY - perpendicularYOffset,
			{
				weight: 800,
				size: 24,
			}
		);
	}
}
