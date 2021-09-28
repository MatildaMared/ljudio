import React, { useState, useContext, useRef, useEffect } from "react";
import { MusicContext } from "./../context/MusicContext";
import {
	getPlaylistsByString,
	getAllMusicByString,
	getArtistsByString,
	getSongsByString,
} from "../services/musicService";

function SearchBar() {
	const [searchInput, setSearchInput] = useState("");
	const [activeType, setActiveType] = useState("all");
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const inputRef = useRef();
	const searchBtnRef = useRef();

	useEffect(() => {
		if (musicContext.searchString.length > 0) {
			fetchMusic();
		}
	}, [activeType]);

	//Save searchresults in local storage
	// useEffect(() => {
	// 	localStorage.setItem(musicContext.searchString, data)
	// }, [musicContext.searchString]);


	useEffect(() => {
		if (musicContext.searchString.length > 0) {
			fetchMusic();
		}
	}, [musicContext.searchString]);

	function onSubmitHandler(e) {
		e.preventDefault();
		updateMusicContext({
			searchString: searchInput.trim().toLowerCase(),
		});
		searchBtnRef.current.blur();
	}

	async function fetchMusic() {
		updateMusicContext({
			isLoading: true,
		});

		let data;

		if (activeType === "all") {
			data = await getAllMusicByString(musicContext.searchString);
			console.log(data.content);
			localStorage.setItem('searchstring', musicContext.searchString)
		} else if (activeType === "songs") {
			data = await getSongsByString(musicContext.searchString);
		} else if (activeType === "artists") {
			data = await getArtistsByString(musicContext.searchString);
		} else if (activeType === "playlists") {
			data = await getPlaylistsByString(musicContext.searchString);
		}

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
					className="search__input"
					type="text"
					ref={inputRef}
					placeholder="Enter text here..."
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<input
					type="submit"
					value="Search"
					className="search__btn"
					ref={searchBtnRef}
				/>
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
				<div
					onClick={() => setActiveType("playlists")}
					className={
						activeType === "playlists"
							? "search__type search__type--active"
							: "search__type"
					}>
					<p>YouTube Playlists</p>
				</div>
			</div>
		</section>
	);
}

export default SearchBar;
