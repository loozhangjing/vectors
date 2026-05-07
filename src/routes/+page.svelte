<script lang="ts">
	import { onMount } from 'svelte';
	import VectorVisualisationCollection from "$lib/VectorVisualisationCollection";
	import Alphabets from "$lib/Alphabets";

	let canvas: HTMLCanvasElement;
	let vectors: VectorVisualisationCollection;
	const pointNames = new Alphabets(false);
	const vectorNames = new Alphabets(true);
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

		console.log(initialX, ev.clientX);
		vectors.addVector(
			{ name: pointNames.generate(), x: initialX, y: initialY },
			{ name: pointNames.generate(), x: ev.clientX, y: ev.clientY },
			vectorNames.generate(),
		);
		mouseCurrentlyDown = false;
		console.log(vectors);
	}
</script>

<canvas
	bind:this={canvas}
	onmousedown={handleMouseDown}
	onmousemove={handleMouseMove}
	onmouseup={handleMouseUp}>
</canvas>
