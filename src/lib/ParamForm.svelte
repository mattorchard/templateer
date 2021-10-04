<script lang="ts">
	import IconCopy from '$lib/icons/IconCopy.svelte';
	import IconPaste from '$lib/icons/IconPaste.svelte';
	import type { Param } from '$lib/helpers/paramHelpers';
	import { createEventDispatcher } from 'svelte';
	import { FilledParam } from '$lib/helpers/paramHelpers';
	import { readFromClipboard, writeToClipboard } from '$lib/helpers/clipboardHelpers';
	import { notificationsStore } from '$lib/stores/notificationsStore';
	export let params: Param[];
	const dispatch = createEventDispatcher();

	let fillValuesMap: Record<string, string> = {};

	$: {
		params.forEach(p => fillValuesMap[p.label] = fillValuesMap[p.label] ??  "")
	}

	function getFilledParams(): FilledParam[] {
		return params.map(p => ({...p, fillValue: fillValuesMap[p.label] ??  ""}));
	}

	function handleSubmit() {
		dispatch('submit', getFilledParams());
	}

	async function copyParams() {
		try {
			const paramRows = params.map(param => fillValuesMap[param.label] ?? "");
			await writeToClipboard(JSON.stringify(paramRows))
			notificationsStore.info("Copied params");
		} catch (error) {
			notificationsStore.danger("Failed to copy params");
			console.error("Failed to copy params", error)
		}
	}

	async function pasteParams() {
		try {
			const rawText = await readFromClipboard();
			const rows = JSON.parse(rawText);
			if (!Array.isArray(rows)) {
				throw new Error(`Not array`)
			}
			params.forEach(param => {
				const index = param.id - 1;
				fillValuesMap[param.label] = rows[index] ?? fillValuesMap[param.label];
			})
			notificationsStore.info("Pasted params");
		} catch (error) {
			notificationsStore.danger("Failed to paste params");
			console.error("Failed to paste params", error);
		}
	}

</script>

<form on:submit|preventDefault={handleSubmit}>
	<header>
	<h2>Params</h2>
		<button type='button' class='icon-button' title="Copy Params" on:click={copyParams}>
			<IconCopy/>
		</button>
		<button type='button' class='icon-button' title="Paste Params" on:click={pasteParams}>
			<IconPaste/>
		</button>
	</header>
	{#if params.length === 0}
		<p>
			Once you add some parameters to the SQL on the right, they'll be listed here.
		</p>
		<p>
			Parameters take the form <em>$1</em>, <em>$2</em>, <em>$3</em>, ... <em>$n</em>
		</p>
	{/if}
	<ol>
		{#each params as param}
			<li>
				<label>
					{param.context}
					<input type='text' placeholder={param.label} bind:value={fillValuesMap[param.label]}>
				</label>
			</li>
		{/each}

	</ol>
	<button type='submit'>
		Copy Output
	</button>
</form>

<style>
	form {
		padding: 1rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	header {
		display: flex;
		align-items: center;
		gap: .5rem;
	}
	h2 {
		font-size: .75rem;
		text-transform: uppercase;
		font-stretch: semi-condensed;
		font-weight: normal;
		opacity: .75;
		display: inline-block;
		margin-right: auto;
	}
	ol {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: .5rem;
	}
	label {
		font-size: .75rem;
	}
	input {
		width: 100%;
	}

	button[type=submit] {
		width: 100%;
		height: 2rem;
		background-color: var(--blue-300);
		color: currentColor;
		font-weight: bold;
	}
  button[type=submit]:hover {
		filter: brightness(1.1);
	}
  button[type=submit]:focus {
		outline: none;
    box-shadow:
        0 0 0 1px var(--blue-600) inset,
        0 0 0 3px var(--grey-500) inset;
	}

	.icon-button {
		width: 1.5rem;
		height: 1.5rem;
		padding: .25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: currentColor;
		border-radius: .25rem;
    background-color: transparent;
		transition: background-color .3s ease-in-out;
	}
  .icon-button:is(:hover, :focus) {
		background-color: var(--grey-600);
	}
	p {
		background-color: var(--grey-600);
		padding: .5rem;
	}
	em {
		color: var(--blue-600);
		font-style: normal;
		font-weight: bold;
	}
</style>