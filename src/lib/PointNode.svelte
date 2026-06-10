<script lang='ts'>
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import { POINT_NODE_HANDLE_RADIUS } from './constants';
	import { typesetMathJaxAttachment } from './utils.ts';

	const handleLength = `${POINT_NODE_HANDLE_RADIUS * 2}px`;
	let { id }: NodeProps = $props();
</script>

<div class='handle-container'>
	<Handle type='source' position={Position.Top} style='width: {handleLength}; height: {handleLength}' />
</div>
<div class='label-container' {@attach typesetMathJaxAttachment}><span>$${id}$$</span></div>

<style>
	.handle-container > :global(.svelte-flow__handle) {
		/* make the point handle invisible unless hovered upon */
		opacity: 0%;
		transition-duration: 0.3s;
	}
	.handle-container > :global(.svelte-flow__handle:hover) {
		opacity: 20%;
	}

	.label-container > span {
		font-size: 24px;
	}
	/* remove space above rendered math */
	.label-container > span > :global(mjx-container) {
		margin-top: 0 !important;
	}
</style>
