import React, {useMemo, memo} from 'react';
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
	margin: 40px 8px 0 8px;
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
	const luminanceMap = useMemo(
		() =>
			new Map(
				[...new Set(icons.map((icon) => icon.hex))].map((hex) => [
					hex,
					// @ts-expect-error: Expected
					getRelativeLuminance.default(`#${hex}`), // eslint-disable-line @typescript-eslint/no-unsafe-call
				]),
			),
		[icons],
	);

	return (
		<VirtuosoGrid
			style={{height: window.innerHeight}}
			totalCount={searchResult.length}
			overscan={100}
			components={{
				// @ts-expect-error: Expected
				List: ListContainer,
			}}
			itemContent={(index) => {
				const icon = searchResult[index];
				return (
					<Icon
						key={icon.slug}
						icon={icon}
						luminance={Number(luminanceMap.get(icon.hex))}
					/>
				);
			}}
		/>
	);
};

export default Icons;
