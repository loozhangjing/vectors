<script lang='ts'>
	import addIcon from '$lib/assets/add_32dp_000000_FILL0_wght400_GRAD0_opsz40.svg';
	import editIcon from '$lib/assets/edit_32dp_000000_FILL0_wght400_GRAD0_opsz40.svg';
	import moveIcon from '$lib/assets/open_with_32dp_000000_FILL0_wght400_GRAD0_opsz40.svg';

	import { SelectionMode } from '$lib/types';
	import GlobalState from '$lib/GlobalState.svelte';
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
		  bind:group={GlobalState.selectionMode} />
	</div>

	<div>
		<label for='edit-mode'><img src='{editIcon}'></label>
		<input
		  type='radio'
		  name='select-mode'
		  id='edit-mode'
		  value={SelectionMode.Edit}
		  bind:group={GlobalState.selectionMode} />
	</div>

	<div>
		<label for='move-mode'><img src='{moveIcon}'></label>
		<input
		  type='radio'
		  name='select-mode'
		  id='move-mode'
		  value={SelectionMode.Move}
		  bind:group={GlobalState.selectionMode} />
	</div>
</fieldset>

<style>
	fieldset {
		width: min-content;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;

		background-color: white;
	}
	legend {
		text-align: center;
	}
	fieldset > div {
		border: 1.5px solid black;
	}
	/* hide the <input>, users have to click on the <label> containing the <img> icon */
	fieldset > div > input {
		display: none;
	}

	label {
		display: block;
		padding: 10px;
	}
	label > img {
		/* remove the vertical space below the <img> icons */
		display: block;
	}

	fieldset > div {
		transition-duration: 0.3s;
	}
	fieldset > div:hover {
		background-color: black;
		cursor: pointer;
	}
	fieldset > div:hover > label {
		filter: invert(1);
		cursor: pointer;
	}

	fieldset > div:has(input:checked) {
		background-color: black;
	}
	fieldset > div:has(input:checked) > label {
		filter: invert(1);
	}
</style>

