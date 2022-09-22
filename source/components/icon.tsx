import React from 'react';
import type {SimpleIcon} from 'simple-icons';

const Icon = ({
	icon,
	contrastLight,
}: {
	icon: SimpleIcon;
	contrastLight: boolean;
}) => {
	const isWhite = icon.hex === 'FFFFFF';

	return (
		<div
			draggable
			className="icon"
			onDragEnd={(event) => {
				// @ts-expect-error: Expect `length`
				if (event.view.length === 0) return;
				const file = new File(
					[
						(event.target as HTMLDivElement)
							.querySelector('svg')
							?.innerHTML?.replace('fill="#000000"', `fill="#${icon.hex}"`) ??
							'',
					],
					'content.svg',
					{
						type: 'image/svg+xml',
					},
				);
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
					isWhite ? 'var(--figma-color-text)' : '#' + icon.hex
				}`,
				borderBottomWidth: isWhite ? 1 : 0,
			}}
			onClick={() => {
				parent.postMessage(
					{
						pluginMessage: {
							type: 'insert-svg',
							svg: `<path d="${icon.path}" fill="#${icon.hex}" />`,
						},
					},
					'*',
				);
			}}
		>
			<svg viewBox="0 0 24 24" width="50" height="50">
				<path fill="#000000" d={icon.path} />
			</svg>
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
