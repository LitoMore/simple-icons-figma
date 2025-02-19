import React, {useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import Search from './components/search.js';
import Icons from './components/icons.js';
import Loading from './components/loading.js';
import type {IconData} from './types.js';
import {loadLatestVersion, loadJson, titleToSlug} from './utils.js';

const App = () => {
	const [searchString, setSearchString] = useState('');
	const [icons, setIcons] = useState<IconData[]>([]);
	const [version, setVersion] = useState<string>('latest');

	useEffect(() => {
		(async () => {
			const version = await loadLatestVersion();
			const json = await loadJson(version);
			const icons = json.map((icon) => ({
				...icon,
				slug: icon.slug || titleToSlug(icon.title),
			}));
			setIcons(icons);
			setVersion(version);
		})();
	}, []);

	return (
		<div className="container">
			<Search
				onChange={(value = '') => {
					setSearchString(value);
				}}
			/>
			{icons.length > 0 ? (
				<Icons searchString={searchString} icons={icons} version={version} />
			) : (
				<Loading />
			)}
		</div>
	);
};

createRoot(document.querySelector('#app')!).render(<App />);
