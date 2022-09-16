import process from 'node:process';
import {readFile, writeFile} from 'node:fs/promises';
import esbuild from 'esbuild';
import {minify} from 'html-minifier-terser';

esbuild
	.build({
		entryPoints: ['source/code.ts'],
		bundle: true,
		platform: 'node',
		target: ['node10.4'],
		outfile: 'distribution/code.js',
	})
	// eslint-disable-next-line unicorn/no-process-exit
	.catch(() => process.exit(1));

const script = await esbuild.build({
	entryPoints: ['source/ui.tsx'],
	loader: {'.tsx': 'tsx'},
	bundle: true,
	minify: true,
	write: false,
	target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
});

const html = await readFile('source/ui.html', 'utf8');

const minifyOptions = {
	collapseWhitespace: true,
	keepClosingSlash: true,
	removeComments: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	useShortDoctype: true,
	minifyCSS: true,
};

await writeFile(
	'distribution/ui.html',
	`<div id="app"></div><script>${
		script.outputFiles[0].text
	}</script>${await minify(html, minifyOptions)}`,
);
