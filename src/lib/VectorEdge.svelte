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
<EdgeLabel x={labelX} y={labelY}><span>{id}</span></EdgeLabel>

<style>
	span {
		font-size: 2rem;
		font-weight: bold;
	}
</style>
