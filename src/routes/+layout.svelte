<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	import '$lib/assets/Luciole-WebFonts/Luciole-Regular.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- load MathJax from the CDN -->
	<script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>
</svelte:head>

{@render children()}
<style>
	:global(body) {
		font-family: Luciole;
	}
</style>
