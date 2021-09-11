import React, { useState, useContext } from "react";
import { MusicContext } from "./../context/MusicContext";
import {
	getAllMusicByString,
} from "../services/musicService";

function SearchBar() {
	const [searchInput, setSearchInput] = useState("");
	const [musicContext, updateMusicContext] = useContext(MusicContext);

	async function getAllMusic(e) {
		e.preventDefault();
		const data = await getAllMusicByString(searchInput.toLowerCase());
		updateMusicContext({
			resultType: "all",
			fetchResult: data,
		});
	}

	return (
		<div>
			<form onSubmit={getAllMusic}>
				<input
					type="text"
					placeholder="Search for artists"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<input type="submit" value="Search..." />
			</form>
		</div>
	);
}

export default SearchBar;
