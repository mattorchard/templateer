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
		const themeName = 'vs-dark-highlight-params'
		monaco.editor.defineTheme(themeName, {
			base: 'vs-dark',
			inherit: true,
			rules: [
				{ token: 'string.sql', foreground: '00DC80' },
				{ token: 'number.sql', foreground: 'FF00DC' },
			],
			colors: { }
		});
		editor = monaco.editor.create(divEl, {
			value,
			language: 'pgsql',
			theme: themeName,
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
