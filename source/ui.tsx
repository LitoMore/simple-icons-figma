import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search.js';
import Icons from './components/icons.js';

const App = () => {
	const [searchString, setSearchString] = useState('');

	return (
		<div>
			<Search
				onChange={(value = '') => {
					setSearchString(value);
				}}
			/>
			<Icons searchString={searchString} />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#app'));
