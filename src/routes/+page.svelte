<script lang="ts">
	import { onMount } from 'svelte';
	import VectorVisualisationCollection from "$lib/VectorVisualisationCollection";

	let canvas: HTMLCanvasElement;
	let vectors: VectorVisualisationCollection;
	onMount(() => {
		vectors = new VectorVisualisationCollection(canvas);
	});

	let mouseCurrentlyDown = false;
	function handleMouseDown(ev: MouseEvent) {
		const x = ev.clientX;
		const y = ev.clientY;

		vectors.addVector({ x, y }, { x, y });
		mouseCurrentlyDown = true;
	}
	function handleMouseMove(ev: MouseEvent) {
		if (mouseCurrentlyDown !== true) return;

		vectors.changeLatestVectorTerminalPoint({ x: ev.clientX, y: ev.clientY });
	}
	function handleMouseUp(ev: MouseEvent) {
		if (mouseCurrentlyDown !== true) throw Error("`mouseCurrentlyDown` is not true");

		vectors.changeLatestVectorTerminalPoint({ x: ev.clientX, y: ev.clientY });
		mouseCurrentlyDown = false;
	}
</script>

<canvas
	bind:this={canvas}
	onmousedown={handleMouseDown}
	onmousemove={handleMouseMove}
	onmouseup={handleMouseUp}>
</canvas>
