import React, { useState, useContext, useRef, useEffect } from "react";
import { MusicContext } from "./../context/MusicContext";
import {
	getAlbumsByString,
	getAllMusicByString,
	getArtistsByString,
	getSongsByString,
} from "../services/musicService";

function SearchBar() {
	const [searchInput, setSearchInput] = useState("");
	const [activeType, setActiveType] = useState("all");
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const inputRef = useRef();

	useEffect(() => {
		if (musicContext.searchString.length > 0) {
			fetchMusic();
		}
	}, [activeType]);

	function onSubmitHandler(e) {
		e.preventDefault();
		updateMusicContext({
			searchString: searchInput.trim().toLowerCase(),
		});
	}

	useEffect(() => {
		if (musicContext.searchString.length > 0) {
			fetchMusic();
		}
	}, [musicContext.searchString]);

	async function fetchMusic() {
		updateMusicContext({
			isLoading: true,
		});

		let data;

		if (activeType === "all") {
			data = await getAllMusicByString(musicContext.searchString);
		} else if (activeType === "songs") {
			data = await getSongsByString(musicContext.searchString);
		} else if (activeType === "artists") {
			data = await getArtistsByString(musicContext.searchString);
		}
		//  else if (activeType === "albums") {
		// 	data = await getAlbumsByString(musicContext.searchString);
		// }

		updateMusicContext({
			resultType: activeType,
			fetchResult: data,
			isLoading: false,
		});
		setSearchInput("");
		inputRef.current.blur();
	}

	return (
		<section className="search">
			<form onSubmit={onSubmitHandler} className="search__form">
				<input
					type="text"
					ref={inputRef}
					placeholder="Enter text here..."
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<input type="submit" value="Search" />
			</form>
			<div className="search__types">
				<div
					onClick={() => setActiveType("all")}
					className={
						activeType === "all"
							? "search__type search__type--active"
							: "search__type"
					}>
					<p>All</p>
				</div>
				<div
					onClick={() => setActiveType("songs")}
					className={
						activeType === "songs"
							? "search__type search__type--active"
							: "search__type"
					}>
					<p>Songs</p>
				</div>
				<div
					onClick={() => setActiveType("artists")}
					className={
						activeType === "artists"
							? "search__type search__type--active"
							: "search__type"
					}>
					<p>Artists</p>
				</div>
				{/* <div
					onClick={() => setActiveType("albums")}
					className={
						activeType === "albums"
							? "search__type search__type--active"
							: "search__type"
					}>
					<p>Albums</p>
				</div> */}
			</div>
		</section>
	);
}

export default SearchBar;
