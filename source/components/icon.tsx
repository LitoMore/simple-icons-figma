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
			className="icon"
			style={{
				border: `${isWhite ? 1 : 2}px solid #${isWhite ? '000' : icon.hex}`,
				borderBottomWidth: isWhite ? 1 : 0,
			}}
			onClick={() => {
				parent.postMessage(
					{pluginMessage: {type: 'insert-svg', svg: icon.svg}},
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
