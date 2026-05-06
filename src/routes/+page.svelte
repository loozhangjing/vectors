<script lang="ts">
	import { onMount } from 'svelte';
	import Two from 'two.js';
	import { Line } from 'two.js/src/shapes/line';

	interface Coordinate {
		x: number;
		y: number;
	}

	class VectorVisualisation {
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

	let canvas: HTMLCanvasElement;
	let two: Two;

	onMount(() => {
		two = new Two({
			fullscreen: true,
			domElement: canvas,
			autostart: true,
		});
	});

	let currentVector: null | VectorVisualisation = null;
	function handleMouseDown(ev: MouseEvent) {
		const x = ev.clientX;
		const y = ev.clientY;

		currentVector = new VectorVisualisation({ x, y }, { x, y }, two);
	}
	function handleMouseMove(ev: MouseEvent) {
		if (currentVector === null) return;

		currentVector.changeTerminalPoint({ x: ev.clientX, y: ev.clientY });
	}
	function handleMouseUp(ev: MouseEvent) {
		if (currentVector === null) throw Error("`currentVector` is null");

		currentVector.changeTerminalPoint({ x: ev.clientX, y: ev.clientY });
		currentVector = null;
	}
</script>

<canvas
	bind:this={canvas}
	onmousedown={handleMouseDown}
	onmousemove={handleMouseMove}
	onmouseup={handleMouseUp}>
</canvas>
