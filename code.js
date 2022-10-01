"use strict";

// source/code.ts
figma.showUI(__html__, { themeColors: true });
figma.ui.resize(540, 540);
figma.ui.onmessage = (message) => {
  if (message.type === "insert-svg") {
    const nodes = [];
    const svg = message.svg;
    const svgNode = figma.createNodeFromSvg(svg);
    nodes.push(svgNode);
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
};
figma.on("drop", (event) => {
  const { files } = event;
  if (files.length > 0 && files[0].type === "image/svg+xml") {
    files[0].getTextAsync().then((text) => {
      const newNode = figma.createNodeFromSvg(text);
      newNode.x = event.absoluteX;
      newNode.y = event.absoluteY;
      figma.currentPage.selection = [newNode];
    });
    return false;
  }
});
