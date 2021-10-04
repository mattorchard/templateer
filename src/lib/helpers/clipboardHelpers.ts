export const writeToClipboard = async (text: string): Promise<void> =>
	await navigator.clipboard.writeText(text);

export const readFromClipboard = async (): Promise<string> => await navigator.clipboard.readText();
