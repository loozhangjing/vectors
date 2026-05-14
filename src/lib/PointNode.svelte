<script lang='ts'>
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import { POINT_NODE_HANDLE_RADIUS } from './constants';

	const handleLength = `${POINT_NODE_HANDLE_RADIUS * 2}px`;
	let { id }: NodeProps = $props();
</script>

<div class='handle-container'>
	<Handle type='source' position={Position.Top} style='width: {handleLength}; height: {handleLength}' />
</div>
<div class='label-container'><span>{id}</span></div>

<style>
	.label-container > span {
		font-size: 32px;
		font-family: 'Georgia';
		font-style: italic;
	}
	.handle-container > :global(.svelte-flow__handle) {
		/* make the point handle invisible unless hovered upon */
		opacity: 0%;
		transition-duration: 0.3s;
	}
	.handle-container > :global(.svelte-flow__handle:hover) {
		opacity: 20%;
	}
</style>
