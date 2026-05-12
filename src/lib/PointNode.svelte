<script lang='ts'>
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';

	let { id }: NodeProps = $props();
</script>

<Handle type='source' position={Position.Top} />
<div><span>{id}</span></div>
