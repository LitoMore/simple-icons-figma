import React from 'react';
import * as simpleIcons from 'simple-icons/icons'; // eslint-disable-line n/file-extension-in-import
import getRelativeLuminance from 'get-relative-luminance';
import {Searcher} from 'fast-fuzzy';
import Icon from './icon.js';

const icons = Object.values(simpleIcons);
const searcher = new Searcher(icons, {
	keySelector: (icon) => [icon.title, icon.slug],
});

const Icons = ({searchString = ''}: {searchString?: string}) => {
	const searchResult = searchString ? searcher.search(searchString) : icons;

	return (
		<div className="icons">
			{searchResult.map((icon) => {
				// @ts-expect-error: Expected
				const luminance = getRelativeLuminance.default(`#${icon.hex}`); // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
				const light = luminance < 0.4;

				return <Icon key={icon.slug} icon={icon} contrastLight={light} />;
			})}
		</div>
	);
};

export default Icons;
