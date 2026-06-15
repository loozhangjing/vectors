<script lang='ts'>
	import addIcon from '$lib/assets/add_32dp_000000_FILL0_wght400_GRAD0_opsz40.svg';
	import editIcon from '$lib/assets/edit_32dp_000000_FILL0_wght400_GRAD0_opsz40.svg';
	import { SelectionMode } from '$lib/types';
	import { DEFAULT_SELECTION_MODE } from '$lib/config';

	let { selectedSelectionMode = $bindable(DEFAULT_SELECTION_MODE) } = $props();
</script>

<fieldset>
	<legend>Selection mode</legend>
	<div>
		<label for='add-mode'><img src='{addIcon}'></label>
		<input
		  type='radio'
		  name='select-mode'
		  id='add-mode'
		  value={SelectionMode.Add}
		  bind:group={selectedSelectionMode} />
	</div>

	<div>
		<label for='edit-mode'><img src='{editIcon}'></label>
		<input
		  type='radio'
		  name='select-mode'
		  id='edit-mode'
		  value={SelectionMode.Edit}
		  bind:group={selectedSelectionMode} />
	</div>
</fieldset>

<style>
	fieldset {
		width: 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	legend, fieldset > div {
		text-align: center;
	}
	fieldset > div {
		width: fit-content;
		border: 1.5px solid black;
	}
	fieldset > div:has(input:checked) {
		background-color: black;
	}
	fieldset > div:has(input:checked) > label {
		filter: invert(1);
	}
	label {
		/* make the label large enough to fully contain the <img> icon inside it */
		display: block;
	}
	label > img {
		margin: 10px;
	}

	div {
		transition-duration: 0.3s;
	}
	div:hover {
		background-color: black;
		cursor: pointer;
	}
	div:hover > label {
		filter: invert(1);
		cursor: pointer;
	}
	input {
		display: none;
	}
</style>

