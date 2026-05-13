<script lang='ts'>
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';

	let { id }: NodeProps = $props();
</script>

<div class='handle-container'>
	<Handle type='source' position={Position.Top} />
</div>
<div class='label-container'><span>{id}</span></div>

<style>
	:global(:root) {
		--point-selection-radius: 75px;
	}
	.label-container {
		z-index: 1000;
	}
	.label-container > span {
		font-size: 32px;
		font-family: 'Georgia';
		font-style: italic;
	}
	.handle-container > :global(.svelte-flow__handle) {
		width: calc(var(--point-selection-radius) * 2);
		height: calc(var(--point-selection-radius) * 2);
		/* make the point handle invisible unless hovered upon */
		opacity: 0%;
		transition-duration: 0.3s;
	}
	.handle-container > :global(.svelte-flow__handle:hover) {
		opacity: 20%;
	}
</style>
