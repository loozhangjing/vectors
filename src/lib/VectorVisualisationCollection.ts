import Two from 'two.js';
import { type NamedPoint } from "./basicTypes";
import DirectedGraph from './DirectedGraph';

export default class VectorVisualisationCollection {
	#two: Two;
	#directedGraph: DirectedGraph;

	constructor(canvasElement: HTMLCanvasElement) {
		this.#two = new Two({
			fullscreen: true,
			domElement: canvasElement,
			autostart: true,
		});
		this.#directedGraph = new DirectedGraph();
	}

	addVector(initialPoint: NamedPoint, terminalPoint: NamedPoint, vectorName: string) {
		this.#directedGraph.addEdge(initialPoint, terminalPoint, vectorName);

		const { x: x1, y: y1 } = initialPoint;
		const { x: x2, y: y2 } = terminalPoint;

		this.#two.makeLine(x1, y1, x2, y2);

		const unitVector = this.#directedGraph.getVector(
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
