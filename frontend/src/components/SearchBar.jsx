import React, { useState, useContext, useRef, useEffect } from "react";
import { MusicContext } from "./../context/MusicContext";
import {
	getAlbumsByString,
	getAllMusicByString,
	getArtistsByString,
	getSongsByString,
} from "../services/musicService";
import "./../../styles/SearchBar.scss";

function SearchBar() {
	const [searchInput, setSearchInput] = useState("");
	const [searchString, setSearchString] = useState("");
	const [activeType, setActiveType] = useState("all");
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const inputRef = useRef();

	useEffect(() => {
		console.log("Inside use effect for active type");
		if (searchString.length > 0) {
			fetchMusic();
		}
	}, [activeType]);

	function onSubmitHandler(e) {
		e.preventDefault();
		console.log("Searchinput is: ", searchInput.trim().toLowerCase());
		setSearchString(searchInput.trim().toLowerCase());
	}

	useEffect(() => {
		if (searchString.length > 0) {
			fetchMusic();
		}
	}, [searchString]);

	async function fetchMusic() {
		updateMusicContext({
			isLoading: true,
		});

		let data;
		console.log("SearchString is: ", searchString);

		if (activeType === "all") {
			data = await getAllMusicByString(searchString);
		} else if (activeType === "songs") {
			data = await getSongsByString(searchString);
		} else if (activeType === "artists") {
			data = await getArtistsByString(searchString);
		} else if (activeType === "albums") {
			data = await getAlbumsByString(searchString);
		}

		console.log(data);

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
					placeholder="Search..."
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
				<div
					onClick={() => setActiveType("albums")}
					className={
						activeType === "albums"
							? "search__type search__type--active"
							: "search__type"
					}>
					<p>Albums</p>
				</div>
			</div>
		</section>
	);
}

export default SearchBar;
