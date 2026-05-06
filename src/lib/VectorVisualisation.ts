import Two from 'two.js';
import { Line } from 'two.js/src/shapes/line';

export interface Coordinate {
	x: number;
	y: number;
}

export default class VectorVisualisation {
	initialPoint = { x: -1, y: -1 };
	terminalPoint = { x: -1, y: -1 };
	two: Two;
	line: Line;

	constructor(initialPoint: Coordinate, terminalPoint: Coordinate, two: Two) {
		const { x: x1, y: y1 } = initialPoint;
		const { x: x2, y: y2 } = terminalPoint;
		this.initialPoint.x = x1;
		this.initialPoint.y = y1;
		this.terminalPoint.x = x2;
		this.terminalPoint.y = y2;

		this.two = two;
		this.line = this.two.makeLine(x1, y1, x2, y2);

		this.two.update();
	}
	changeTerminalPoint(newCoordinates: Coordinate) {
		const { x, y } = newCoordinates;
		this.terminalPoint.x = x;
		this.terminalPoint.y = y;
		this.line.vertices[1].set(x, y);

		this.two.update();
	}
}

