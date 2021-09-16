import React from "react";
import SearchBar from "../components/SearchBar";
import Result from "../components/Result";

function SearchPage() {
	return (
		<div className="search-content main-wrapper">
			<SearchBar />
			<Result />
		</div>
	);
}

export default SearchPage;
