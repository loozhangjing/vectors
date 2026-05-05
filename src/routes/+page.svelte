<script lang="ts">
	import { onMount } from 'svelte';
	import Two from 'two.js';

	let canvas: HTMLCanvasElement;
	let two: Two;
	onMount(() => {
		two = new Two({
			fullscreen: true,
			domElement: canvas,
			autostart: true,
		});
	});

	let startX = 0;
	let startY = 0;
	function drawVector(startX: number, startY: number, endX: number, endY: number) {
		two.makeLine(startX, startY, endX, endY);
	}
	function handleMouseDown(ev: MouseEvent) {
		startX = ev.clientX;
		startY = ev.clientY;
	}
	function handleMouseUp(ev: MouseEvent) {
		drawVector(startX, startY, ev.clientX, ev.clientY);
	}
</script>

<canvas bind:this={canvas} onmousedown={handleMouseDown} onmouseup={handleMouseUp}></canvas>
