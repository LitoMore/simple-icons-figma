import type {IconJson, JsDelivrNpmResponse} from './types';

const titleToSlugReplacements: Record<string, string> = {
	/* eslint-disable @typescript-eslint/naming-convention */
	'+': 'plus',
	'.': 'dot',
	'&': 'and',
	/* eslint-enable */
	đ: 'd',
	ħ: 'h',
	ı: 'i',
	ĸ: 'k',
	ŀ: 'l',
	ł: 'l',
	ß: 'ss',
	ŧ: 't',
};

const titleToSlugCharsRegex = new RegExp(
	`[${Object.keys(titleToSlugReplacements).join('')}]`,
	'g',
);

const titleToSlugRangeRegex = /[^a-z\d]/g;

export const titleToSlug = (title: string) =>
	title
		.toLowerCase()
		.replace(titleToSlugCharsRegex, (char) => titleToSlugReplacements[char])
		.normalize('NFD')
		.replace(titleToSlugRangeRegex, '');

export const loadLatestVersion = async () => {
	const response = await fetch(
		'https://data.jsdelivr.com/v1/packages/npm/simple-icons',
	);
	const json = (await response.json()) as JsDelivrNpmResponse;
	return json.tags.latest;
};

export const loadJson = async (simpleIconsVersion: string) => {
	const response = await fetch(
		`https://cdn.jsdelivr.net/npm/simple-icons@${simpleIconsVersion}/_data/simple-icons.json`,
	);
	const json = (await response.json()) as IconJson;
	return json;
};

export const loadSvg = async (simpleIconsVersion: string, slug: string) => {
	const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@${simpleIconsVersion}/icons/${slug}.svg`;
	const response = await fetch(iconUrl);
	const svg = await response.text();
	return svg;
};
