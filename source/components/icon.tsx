import React from 'react';
import type {IconData} from '../types.js';
import {loadSvg, simpleIconsVersion} from '../utils.js';

const Icon = ({
	icon,
	contrastLight,
}: {
	icon: IconData;
	contrastLight: boolean;
}) => {
	const isWhite = icon.hex === 'FFFFFF';

	return (
		<div
			draggable
			className="icon"
			onDragEnd={async (event) => {
				// @ts-expect-error: Expect `length`
				if (event.view.length === 0) return;
				const svg = await loadSvg(icon.slug);
				const coloredSvg = svg.replace('<path ', `<path fill="#${icon.hex}" `);
				const file = new File([coloredSvg], 'content.svg', {
					type: 'image/svg+xml',
				});
				parent.postMessage(
					{
						pluginDrop: {
							clientX: event.clientX,
							clientY: event.clientY,
							files: [file].filter(Boolean),
						},
					},
					'*',
				);
			}}
			style={{
				border: `${isWhite ? 1 : 2}px solid ${
					isWhite
						? 'var(--figma-color-text, var(--fallback-color-text))'
						: '#' + icon.hex
				}`,
				borderBottomWidth: isWhite ? 1 : 0,
			}}
			onClick={async () => {
				const svg = await loadSvg(icon.slug);
				parent.postMessage(
					{
						pluginMessage: {
							type: 'insert-svg',
							svg: svg.replace('<path ', `<path fill="#${icon.hex}" `),
						},
					},
					'*',
				);
			}}
		>
			<img
				className="icon-image"
				src={`https://cdn.jsdelivr.net/npm/simple-icons@${simpleIconsVersion}/icons/${icon.slug}.svg`}
			/>
			<div className="icon-title">{icon.title}</div>
			<div
				className={`icon-color ${contrastLight ? 'light' : ''}`}
				style={{backgroundColor: `#${icon.hex}`}}
			>
				#{icon.hex}
			</div>
		</div>
	);
};

export default Icon;
