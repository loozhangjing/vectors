<script lang='ts'>
	import { BaseEdge, EdgeLabel, getStraightPath, type EdgeProps } from '@xyflow/svelte';
	import { POINT_NODE_HANDLE_RADIUS } from './constants';
	import { typesetMathJaxAttachment } from './utils';

	let { id, sourceX, sourceY, targetX, targetY }: EdgeProps = $props();

	let [edgePath, labelX, labelY] = $derived(
		// make the connection start from the centre of the handle of a point node instead of from the top
		getStraightPath({
			sourceX,
			sourceY: sourceY + POINT_NODE_HANDLE_RADIUS,
			targetX,
			targetY: targetY + POINT_NODE_HANDLE_RADIUS
		})
	);
</script>

<BaseEdge {id} path={edgePath} />
<EdgeLabel x={labelX} y={labelY}>
	<div class='label-container'>
		<span {@attach typesetMathJaxAttachment}>$$\underset{'{'}\sim{'}'}{'{'}{id}{'}'}$$</span>
	</div>
</EdgeLabel>

<style>
	:global(.svelte-flow__edge-path) {
		stroke: black;
	}
	.label-container > span {
		font-size: 32px;
	}
</style>
