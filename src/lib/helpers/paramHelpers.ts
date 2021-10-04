export interface Param {
	label: string;
	context: string;
	id: number;
}

export interface FilledParam extends Param {
	fillValue: string;
}

const toId = (text: string) => {
	const id = Number(text.substring(1));
	if (isNaN(id)) {
		throw new Error(`Cannot make ID from ${text}`);
	}
	return id;
};

const dedupeById = (items: Param[]): Param[] => {
	const map = new Map<number, Param>();
	items.forEach((item) => {
		if (!map.has(item.id)) {
			map.set(item.id, item);
		}
	});
	return [...map.values()];
};

export const getParams = (text: string): Param[] => {
	const allParams = [...text.matchAll(/.{0,50}?(\$\d+).{0,50}?/g)].map(([context, label]) => ({
		context: context.trim(),
		label,
		id: toId(label)
	}));
	const novelParams = dedupeById(allParams);
	novelParams.sort((a, b) => a.id - b.id);
	return novelParams;
};

export const applyFilledParams = (text: string, params: FilledParam[]): string =>
	params.reduce(
		(text, param) => (param.fillValue ? text.replaceAll(param.label, param.fillValue) : text),
		text
	);
