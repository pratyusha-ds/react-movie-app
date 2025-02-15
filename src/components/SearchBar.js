import React from 'react';

const SearchBar = (props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Enter movie name...'
			></input>
		</div>
	);
};

export default SearchBar;