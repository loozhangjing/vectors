<script lang='ts'>
	import { BaseEdge, EdgeLabel, getStraightPath, type EdgeProps } from '@xyflow/svelte';
	import arrowIcon from '$lib/assets/keyboard_arrow_down_32dp_000000_FILL0_wght400_GRAD0_opsz40.svg';
	import { POINT_NODE_HANDLE_RADIUS, EDGE_LABEL_OFFSET_X, EDGE_LABEL_OFFSET_Y } from '$lib/config';
	import { typesetMathJaxAttachment, latexTildeUnderLetterCommand } from '$lib/utils';

	let { id, sourceX, sourceY: sourceYTop, targetX, targetY: targetYTop }: EdgeProps = $props();

	// set y-coordinates to the centre of the handle of a PointNode instead of its top
	let sourceY = $derived(sourceYTop + POINT_NODE_HANDLE_RADIUS);
	let targetY = $derived(targetYTop + POINT_NODE_HANDLE_RADIUS);

	let [edgePath, labelX, labelY] = $derived(
		getStraightPath({
			sourceX,
			sourceY,
			targetX,
			targetY,
		})
	);

	// offset the edge label so that it doesn't render directly above the edge line
	let componentX = $derived(targetX - sourceX);
	let componentY = $derived(targetY - sourceY);
	let magnitude = $derived(Math.sqrt(componentX ** 2 + componentY ** 2));

	let absoluteAngle = $derived(Math.acos(componentY / magnitude));
	let angle = $derived(componentX > 0 ? -absoluteAngle : absoluteAngle);

	let perpendicularX = $derived(labelX + (componentY / magnitude * EDGE_LABEL_OFFSET_X));
	let perpendicularY = $derived(labelY + (componentX / magnitude * EDGE_LABEL_OFFSET_Y));
</script>

<BaseEdge {id} path={edgePath} />
<EdgeLabel x={labelX} y={labelY}>
	<img src={arrowIcon} style='transform: rotate({angle}rad)'>
</EdgeLabel>
<EdgeLabel x={perpendicularX} y={perpendicularY}>
	<div class='label-container'>
		<span {@attach typesetMathJaxAttachment}>$${latexTildeUnderLetterCommand(id)}$$</span>
	</div>
</EdgeLabel>

<style>
	:global(.svelte-flow__edge-path) {
		stroke: black;
	}
	:global(.svelte-flow__edge-label) {
		background-color: transparent;
	}
	.label-container > span {
		font-size: 32px;
	}
	.label-container > span > :global(mjx-container) {
		/* the default margin covers too much of the vector line */
		margin: 0 !important;
	}
</style>
