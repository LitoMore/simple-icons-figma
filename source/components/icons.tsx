import React, {forwardRef} from 'react';
import styled from 'styled-components'; // eslint-disable-line import/no-named-as-default
import getRelativeLuminance from 'get-relative-luminance';
import {Searcher} from 'fast-fuzzy';
import {VirtuosoGrid} from 'react-virtuoso';
import type {IconData} from '../types.js';
import Icon from './icon.js';

const ListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 33px;
	gap: 5px;
`;

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
		<VirtuosoGrid
			style={{height: 520}}
			totalCount={searchResult.length}
			overscan={100}
			components={{
				// @ts-expect-error: Expected
				List: ListContainer,
			}}
			itemContent={(index) => {
				const icon = searchResult[index];
				// @ts-expect-error: Expected
				const luminance = getRelativeLuminance.default(`#${icon.hex}`); // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
				const light = luminance < 0.4;
				return <Icon key={icon.slug} icon={icon} contrastLight={light} />;
			}}
		/>
	);
};

export default Icons;
