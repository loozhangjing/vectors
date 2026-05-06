import VectorVisualisation, { type Coordinate } from "./VectorVisualisation";
import Two from 'two.js';

export default class VectorVisualisationCollection {
	two: Two;
	vectors: VectorVisualisation[];

	constructor(canvasElement: HTMLCanvasElement) {
		this.two = new Two({
			fullscreen: true,
			domElement: canvasElement,
			autostart: true,
		});
		this.vectors = [];
	}

	addVector(initialPoint: Coordinate, terminalPoint: Coordinate) {
		const vector = new VectorVisualisation(initialPoint, terminalPoint, this.two);

		this.vectors.push(vector);
	}
	changeLatestVectorTerminalPoint(newCoordinates: Coordinate) {
		this.vectors[this.vectors.length - 1].changeTerminalPoint(newCoordinates);
	}
}
