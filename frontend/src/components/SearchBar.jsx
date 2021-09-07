import React from 'react'

function SearchBar() {
const searchResult = (event) => {
    const searchString = event.target.value;
    console.log(searchString);
}

    return (
        <div>
            <input type="submit" placeholder="Search" onChange= { searchResult } />
        </div>
    )
}

export default SearchBar
