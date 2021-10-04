<script context='module' lang='ts'>
	export const prerender = true;
</script>

<script lang='ts'>
	import Editor from '$lib/Editor.svelte';
	import ParamForm from '$lib/ParamForm.svelte';
	import Footer from '$lib/Footer.svelte';
	import { applyFilledParams, FilledParam, getParams, Param } from '$lib/helpers/paramHelpers';
	import { writeToClipboard } from '$lib/helpers/clipboardHelpers';
	import Toaster from '$lib/Toaster.svelte';
	import { notificationsStore } from '$lib/stores/notificationsStore';

	let editorText = [
		`SELECT *`,
		`FROM student_table`,
		`INNER JOIN grade_table`,
		`\tUSING (student_id)`,
		`WHERE school = $1`,
		`\tAND letter_grade BETWEEN $2 AND $3;`
	].join('\n');

	let params: Param[];
	$: params = getParams(editorText);

	const handleSubmit = ({ detail: filledParams }: { detail: FilledParam[] }) => {
		const transformedText = applyFilledParams(editorText, filledParams);
		console.log('Copied output', transformedText);
		writeToClipboard(transformedText);
		notificationsStore.info("Copied to clipboard");
	};

</script>

<div class='root'>
	<main>
		<div class="side-bar">
			<ParamForm params={params} on:submit={handleSubmit} />
		</div>
		<Editor bind:value={editorText} />
	</main>
	<Footer />
</div>
<Toaster/>

<style>
  .root {
    display: grid;
    grid-template-rows: 1fr 2rem;
    height: 100vh;
    max-height: 100vh;
  }
  main {
    display: grid;
    grid-template-columns: 18rem 1fr;
  }
	.side-bar {
		display: flex;
		max-height: 100vh;
		overflow-y: auto;
	}
</style>
