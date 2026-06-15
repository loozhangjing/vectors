<script lang='ts'>
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import { POINT_NODE_HANDLE_RADIUS } from '../config';
	import { typesetMathJaxAttachment } from '../utils.ts';
	import { SelectionMode } from '$lib/types';
	import GlobalState from '$lib/GlobalState.svelte';

	const handleLength = `${POINT_NODE_HANDLE_RADIUS * 2}px`;
	let { id }: NodeProps = $props();
</script>

<div class={{
	 'handle-container': true,
	 'disable-handle': GlobalState.selectionMode === SelectionMode.Edit,
}}>
	<Handle type='source' position={Position.Top} style='width: {handleLength}; height: {handleLength}' />
</div>
<div class={{
	 'label-container': true,
	 'nodrag': GlobalState.selectionMode === SelectionMode.Add,
}} {@attach typesetMathJaxAttachment}><span>$${id}$$</span></div>

<style>
	.handle-container.disable-handle > :global(.svelte-flow__handle) {
		visibility: hidden;
	}
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
	.label-container:not(.nodrag) > span > :global(mjx-container):hover {
		cursor: grab;
	}
</style>
