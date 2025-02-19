import React from 'react';
import type {IconData} from '../types.js';
import {loadSvg} from '../utils.js';

const Icon = ({
	icon,
	luminance,
	version,
}: {
	icon: IconData;
	luminance: number;
	version: string;
}) => {
	const isWhite = icon.hex === 'FFFFFF';
	const isBright = luminance >= 0.4;
	const isDark = luminance <= 0.05;

	return (
		<div
			draggable
			className={`icon  ${isBright ? 'bright' : isDark ? 'dark' : ''}`}
			onDragEnd={async (event) => {
				// @ts-expect-error: Expect `length`
				if (event.view.length === 0) return;
				const svg = await loadSvg(version, icon.slug);
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
						: `#${icon.hex}`
				}`,
				borderBottomWidth: isWhite ? 1 : 0,
			}}
			onClick={async () => {
				const svg = await loadSvg(version, icon.slug);
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
			<div
				className="icon-image"
				style={{
					backgroundColor: isWhite ? 'currentColor' : `#${icon.hex}`,
					WebkitMask: `url(https://cdn.jsdelivr.net/npm/simple-icons@${version}/icons/${icon.slug}.svg)`,
					WebkitMaskSize: 'contain',
					WebkitMaskRepeat: 'no-repeat',
					WebkitMaskPosition: 'center',
				}}
			/>
			<div className="icon-title">{icon.title}</div>
			<div
				className={`icon-color ${isBright ? '' : 'light'}`}
				style={{
					backgroundColor: `#${icon.hex}`,
				}}
			>
				#{icon.hex}
			</div>
		</div>
	);
};

export default Icon;
