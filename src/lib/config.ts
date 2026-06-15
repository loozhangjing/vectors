import PointNode from '$lib/components/PointNode.svelte';
import VectorEdge from '$lib/components/VectorEdge.svelte';
import { SelectionMode } from '$lib/types';

export const NODE_TYPES = { point: PointNode };
export const EDGE_TYPES = { vector: VectorEdge };

export const DEFAULT_NODES = [
	{
		id: 'A',
		type: 'point',
		position: { x: 300, y: 100 },
		data: {}
	},
	{
		id: 'B',
		type: 'point',
		position: { x: 600, y: 400 },
		data: {}
	}
];

export const DEFAULT_EDGES = [
	{
		id: 'p',
		type: 'vector',
		source: 'A',
		target: 'B'
	}
];

export const DEFAULT_SELECTION_MODE = SelectionMode.Add;

export const POINT_NODE_HANDLE_RADIUS = 75;
