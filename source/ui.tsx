import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
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
			const icons = json.icons.map((icon) => ({
				...icon,
				slug: icon.slug || titleToSlug(icon.title),
			}));
			setIcons(icons);
			setVersion(version);
		})();
	});

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

ReactDOM.render(<App />, document.querySelector('#app'));
