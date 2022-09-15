const normalizeName = (name: string) =>
	name.normalize('NFD').replace(/[\u0300-\u036F]/g, '');

export const fuzzyMatched = (name: string, searchString?: string) => {
	if (!searchString) return true;

	const searchPattern = new RegExp(
		normalizeName(searchString).split('').join('.*'),
		'i',
	);

	return searchPattern.exec(normalizeName(name));
};
