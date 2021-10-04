<script lang="ts">
	import type Monaco from 'monaco-editor';
	import { onMount } from 'svelte';
	import PsqlWorker from 'monaco-editor/esm/vs/basic-languages/pgsql/pgsql.js?worker';
	export let value: string;


	let divEl: HTMLDivElement = null;
	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;




	onMount(async () => {
		// noinspection JSUnusedGlobalSymbols
		(self as Monaco.Window).MonacoEnvironment = {
			getWorker: () => new PsqlWorker()
		};

		monaco = await import('monaco-editor');
		editor = monaco.editor.create(divEl, {
			value,
			language: 'pgsql',
			theme: 'vs-dark',
			scrollBeyondLastLine: false,
			minimap: {
				enabled: false
			}
		});

		const changeDisposer = editor.onDidChangeModelContent(() =>
			value = editor.getValue()
		)

		return () => {
			changeDisposer.dispose();
			editor.dispose();

		};
	});
</script>

<div bind:this={divEl} />

<style>
	div {
		background-color: var(--grey-400);
	}
</style>
