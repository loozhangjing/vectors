<script lang="ts">
	import { onMount } from 'svelte';
	import Two from 'two.js';
	import { Line } from 'two.js/src/shapes/line';

	let canvas: HTMLCanvasElement;
	let two: Two;

	onMount(() => {
		two = new Two({
			fullscreen: true,
			domElement: canvas,
			autostart: true,
		});
	});

	let currentLine: null | Line = null;
	function handleMouseDown(ev: MouseEvent) {
		const x = ev.clientX;
		const y = ev.clientY;

		currentLine = two.makeLine(x, y, x, y);
		console.log(currentLine);
		two.update();
	}
	function handleMouseMove(ev: MouseEvent) {
		if (currentLine === null) return;

		currentLine.vertices[1].set(ev.clientX, ev.clientY);
		two.update();
	}
	function handleMouseUp(ev: MouseEvent) {
		if (currentLine === null) throw Error("`currentLine` is null");

		currentLine.vertices[1].set(ev.clientX, ev.clientY);
		two.update();
		currentLine = null;
	}
</script>

<canvas
	bind:this={canvas}
	onmousedown={handleMouseDown}
	onmousemove={handleMouseMove}
	onmouseup={handleMouseUp}>
</canvas>
