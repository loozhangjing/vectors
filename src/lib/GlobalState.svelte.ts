import { DEFAULT_SELECTION_MODE, DEFAULT_NODES, DEFAULT_EDGES } from '$lib/config';
import DirectedGraph from '$lib/DirectedGraph';

class GlobalState {
	selectionMode = $state(DEFAULT_SELECTION_MODE);
	nodes = $state.raw(DEFAULT_NODES);
	edges = $state.raw(DEFAULT_EDGES);
	directedGraph = $derived(new DirectedGraph({ nodes: this.nodes, edges: this.edges }));
}

export default new GlobalState();
