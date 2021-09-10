import React, { useState, useContext } from "react";
import { MusicContext } from "./../context/MusicContext";
import {
	getSongsByString,
	getAllMusicByString,
} from "../services/musicService";
import { UserContext } from "./../context/UserContext";

function SearchBar() {
	const [searchInput, setSearchInput] = useState("");
	const [musicContext, updateMusicContext] = useContext(MusicContext);

	async function getAllMusic(e) {
		e.preventDefault();
		const data = await getAllMusicByString(searchInput);
		updateMusicContext({
			fetchResult: {
				type: "all",
				data,
			},
		});
	}

	return (
		<div>
			<form onSubmit={getAllMusic}>
				<input
					type="text"
					placeholder="Search for artists"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
				/>
				<input type="submit" value="Search..." />
			</form>
		</div>
	);
}

export default SearchBar;
