<script lang='ts'>
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';

	let { id }: NodeProps = $props();
</script>

<div class='handle-container'>
	<Handle type='source' position={Position.Top} />
</div>
<div class='label-container'><span>{id}</span></div>

<style>
	span {
		font-size: 32px;
		font-family: 'Georgia';
		font-style: italic;
	}
	.handle-container > :global(.svelte-flow__handle) {
		width: 10px;
		height: 10px;
	}
</style>
