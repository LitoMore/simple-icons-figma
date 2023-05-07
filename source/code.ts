/* eslint unicorn/prefer-add-event-listener: off */
figma.showUI(__html__, {themeColors: true});
figma.ui.resize(540, 540);

figma.ui.onmessage = (message) => {
	if (message.type === 'insert-svg') {
		const nodes: SceneNode[] = [];
		const svg = message.svg as string;
		const svgNode = figma.createNodeFromSvg(svg);
		nodes.push(svgNode);
		figma.currentPage.selection = nodes;
		figma.viewport.scrollAndZoomIntoView(nodes);
	}
};

// @ts-expect-error: Ingore return type
figma.on('drop', (event) => {
	const {files} = event;
	if (files.length > 0 && files[0].type === 'image/svg+xml') {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		files[0].getTextAsync().then((text) => {
			const newNode = figma.createNodeFromSvg(text);
			newNode.x = event.absoluteX;
			newNode.y = event.absoluteY;
			figma.currentPage.selection = [newNode];
		});
		return false;
	}
});
