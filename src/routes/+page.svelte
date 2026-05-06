<script lang="ts">
	import { onMount } from 'svelte';
	import VectorVisualisationCollection from "$lib/VectorVisualisationCollection";

	let canvas: HTMLCanvasElement;
	let vectors: VectorVisualisationCollection;
	onMount(() => {
		vectors = new VectorVisualisationCollection(canvas);
	});

	let initialX = -1;
	let initialY = -1;
	let mouseCurrentlyDown = false;
	function handleMouseDown(ev: MouseEvent) {
		initialX = ev.clientX;
		initialY = ev.clientY;

		mouseCurrentlyDown = true;
	}
	function handleMouseMove(ev: MouseEvent) {
		if (mouseCurrentlyDown !== true) return;
	}
	function handleMouseUp(ev: MouseEvent) {
		if (mouseCurrentlyDown !== true) throw Error("`mouseCurrentlyDown` is not true");

		vectors.addVector({ name: "A", x: initialX, y: initialY }, { name: "B", x: ev.clientX, y: ev.clientY }, "a");
		mouseCurrentlyDown = false;
	}
</script>

<canvas
	bind:this={canvas}
	onmousedown={handleMouseDown}
	onmousemove={handleMouseMove}
	onmouseup={handleMouseUp}>
</canvas>
