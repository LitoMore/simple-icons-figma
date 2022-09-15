import React from 'react';

const Search = ({onChange}: {onChange?: (value?: string) => void}) => (
	<input
		type="search"
		className="search-input"
		placeholder="Search by brand..."
		onChange={(event) => {
			onChange?.(event.target.value);
		}}
	/>
);

export default Search;
