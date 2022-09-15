import React from 'react';
import * as simpleIcons from 'simple-icons/icons'; // eslint-disable-line n/file-extension-in-import
import getRelativeLuminance from 'get-relative-luminance';
import {fuzzyMatched} from '../utils.js';
import Icon from './icon.js';

const Icons = ({searchString = ''}: {searchString?: string}) => {
	const icons = Object.values(simpleIcons);

	return (
		<div className="icons">
			{icons
				.filter((icon) =>
					Boolean(
						fuzzyMatched(icon.title, searchString) ??
							fuzzyMatched(icon.slug, searchString),
					),
				)
				.map((icon) => {
					// @ts-expect-error: Expected
					const luminance = getRelativeLuminance.default(`#${icon.hex}`); // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
					const light = luminance < 0.4;

					return <Icon key={icon.slug} icon={icon} contrastLight={light} />;
				})}
		</div>
	);
};

export default Icons;
