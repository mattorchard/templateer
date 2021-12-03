const quoteLiteral = (text: string) => `'${text}'`;

type FromJson = number | string | null | Array<FromJson> | { [key: string]: FromJson };

export const valueAsSql = (param: FromJson): string => {
	if (param == null) {
		return 'null';
	}
	if (Array.isArray(param)) {
		return `'{${param.join(', ')}}'`;
	}
	switch (typeof param) {
		case 'number':
			return param.toString();
		case 'string':
			return quoteLiteral(param);
		case 'object':
			return quoteLiteral(JSON.stringify(param));
	}
};
