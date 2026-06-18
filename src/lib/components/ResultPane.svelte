<script lang='ts'>
	import { untrack } from 'svelte';

	import {
		typesetMathJaxAttachment, latexTildeUnderLetterCommand, latexRightArrowAboveLettersCommand
	} from '$lib/utils';

	import { type NamedVector } from '$lib/types';
	import { DEFAULT_SELECTED_INITIAL_NODE_ID, DEFAULT_SELECTED_GOAL_NODE_ID } from '$lib/config';
	import GlobalState from '$lib/GlobalState.svelte';
	import findAllPathsBetweenTwoNodes from '$lib/functions/findAllPathsBetweenTwoNodes';

	let initialNodeId = $state(DEFAULT_SELECTED_INITIAL_NODE_ID);
	let goalNodeId = $state(DEFAULT_SELECTED_GOAL_NODE_ID);
	let paths: NamedVector[][] = $state([]);

	$effect(() => {
		// `$effect` tracks changes to the three variables provided as function arguments below
		const newPaths = findAllPathsBetweenTwoNodes(
			GlobalState.directedGraph,
			initialNodeId,
			goalNodeId
		);

		// all references to the `paths` variable must be inside an `untrack()`, so that changes to
		// `paths` aren't tracked, or else this whole callback provided to `$effect` would run again
		untrack(() => paths = newPaths);
	});
</script>

<div id='source-and-tail-node-select-container'>
	<label for="sourceNodeSelect">Starting point:</label>
	<select id="sourceNodeSelect" bind:value={initialNodeId}>
		{#each GlobalState.nodes as node}
			<option value={node.id}>{node.id}</option>
		{/each}
	</select>

	<label for="tailNodeSelect">Ending point:</label>
	<select id="tailNodeSelect" bind:value={goalNodeId}>
		{#each GlobalState.nodes as node}
			<option value={node.id}>{node.id}</option>
		{/each}
	</select>
</div>

<h2>Results</h2>
<ul>
	<!-- "Key blocks destroy and recreate their contents when the value of an expression changes." - Svelte docs -->
	<!-- the mathematics previously typeset by MathJax will be removed every time `paths` is updated -->
	{#key paths}
	{#each paths as path}
		<li {@attach typesetMathJaxAttachment}>$$
			<!-- use the 'aligned' environment to align all equal signs preceded by an ampersand (&) -->
			\begin{'{'}aligned{'}'}

			{latexRightArrowAboveLettersCommand(initialNodeId, goalNodeId)}

			&= {#each path as namedVector, index}
				{latexRightArrowAboveLettersCommand(namedVector.headNodeId, namedVector.tailNodeId)}
				{#if index < path.length - 1}+{/if}
			{/each}

			\newline

			&= {#each path as namedVector, index}
				{latexTildeUnderLetterCommand(namedVector.name)}
				{#if index < path.length - 1}+{/if}
			{/each}
			<!-- prevent the curly braces meant to be LaTeX from being misinterpreted by Svelte -->
			<!-- by putting them inside JavaScript strings -->
			\end{'{'}aligned{'}'}
		$$</li>
	{/each}
	{/key}
</ul>

<style>
	#source-and-tail-node-select-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5px 10px;
		align-items: center;
	}
	select, option {
		font-family: 'Luciole';
		font-size: 1rem;
		padding: 5px 10px;
		border: 1.5px solid black;
		border-radius: 0;
	}
	select:hover {
		cursor: pointer;
	}
</style>
