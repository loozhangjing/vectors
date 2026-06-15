import { DEFAULT_SELECTION_MODE, DEFAULT_NODES, DEFAULT_EDGES } from '$lib/config';

class GlobalState {
	selectionMode = $state(DEFAULT_SELECTION_MODE);
	nodes = $state.raw(DEFAULT_NODES);
	edges = $state.raw(DEFAULT_EDGES);
}

export default new GlobalState();
