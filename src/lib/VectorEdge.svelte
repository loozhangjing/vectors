<script lang='ts'>
	import { BaseEdge, EdgeLabel, getStraightPath, type EdgeProps } from '@xyflow/svelte';

	let { id, sourceX, sourceY, targetX, targetY }: EdgeProps = $props();

	let [edgePath, labelX, labelY] = $derived(
		getStraightPath({
			sourceX,
			sourceY,
			targetX,
			targetY
		})
	);
</script>

<BaseEdge {id} path={edgePath} />
<EdgeLabel x={labelX} y={labelY}>
	<div class='label-container'>
		<span>{id}</span>
		<span>~</span>
	</div>
</EdgeLabel>

<style>
	:global(.svelte-flow__edge-path) {
		/* make the connection start from the centre of a point node instead of from the top */
		/* this variable is defined in PointNode.svelte */
		transform: translateY(var(--point-selection-radius));
		stroke: black;
	}
	span {
		font-size: 32px;
		font-family: 'Georgia';
		font-weight: bold;
		font-style: italic;
	}
	span:last-child {
		/* force the ~ onto a new line, below the vector name */
		display: block;
		position: absolute;
		left: 0%;
		top: 60%;
	}
</style>
