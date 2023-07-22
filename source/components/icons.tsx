import React from 'react';
import getRelativeLuminance from 'get-relative-luminance';
import {Searcher} from 'fast-fuzzy';
import type {IconData} from '../types.js';
import Icon from './icon.js';

const Icons = ({
	searchString = '',
	icons,
}: {
	searchString?: string;
	icons: IconData[];
}) => {
	const searcher = new Searcher(icons, {
		keySelector: (icon) => [icon.title, icon.slug],
	});
	const searchResult = searchString ? searcher.search(searchString) : icons;

	return (
		<div className="icons">
			{searchResult.map((icon: IconData) => {
				// @ts-expect-error: Expected
				const luminance = getRelativeLuminance.default(`#${icon.hex}`); // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
				const light = luminance < 0.4;

				return <Icon key={icon.slug} icon={icon} contrastLight={light} />;
			})}
		</div>
	);
};

export default Icons;
