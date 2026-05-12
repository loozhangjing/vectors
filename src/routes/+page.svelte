<script>
	import { SvelteFlow, Background, ConnectionMode } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import PointNode from '$lib/PointNode.svelte';
	
	const nodeTypes = { point: PointNode };

	let nodes = $state.raw([
		{ id: 'A', type: 'point', position: { x: 200, y: 0 }, data: { } },
		{ id: 'B', type: 'point', position: { x: 1000, y: 400 }, data: { } },
		{ id: 'C', type: 'point', position: { x: 0, y: 200 }, data: { } },
	]);

	let edges = $state.raw([
		{ id: 'x', type: 'straight', source: 'A', target: 'B' },
		{ id: 'y', type: 'straight', source: 'C', target: 'B' },
		{ id: 'z', type: 'straight', source: 'C', target: 'A' },
	]);
</script>

<div style:width="100vw" style:height="100vh">
	<SvelteFlow
	 bind:nodes
	 bind:edges
	 {nodeTypes}
	 connectionMode={ConnectionMode.Loose}
	>
		<Background />
	</SvelteFlow>
</div>
