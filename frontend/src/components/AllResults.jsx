import React, { useContext } from "react";
import { MusicContext } from "./../context/MusicContext";
import "./../../styles/AllResults.scss";

function AllResults() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	console.log(musicContext.fetchResult);
	let songsArray = [];
	let artistsArray = [];
	let albumsArray = [];

	function sortResults(array) {
		array.forEach((item) => {
			if (item.type === "song") {
				songsArray.push(item);
			} else if (item.type === "artist") {
				artistsArray.push(item);
			} else if (item.type === "album") {
				albumsArray.push(item);
			}
		});

		console.log("Songs: ", songsArray);
		console.log("Artists: ", artistsArray);
		console.log("Albums: ", albumsArray);
	}

	sortResults(musicContext.fetchResult.content);

	return (
		<div className="all-results">
			<h1>Alla Resultat</h1>
			<h2>Artists</h2>
			<ul>
				{artistsArray &&
					artistsArray.map((item) => (
						<li>
							<p>{item.name}</p>
						</li>
					))}
			</ul>
			<h2>Albums</h2>
			<ul>
				{albumsArray &&
					albumsArray.map((item) => (
						<li>
							<p>{item.name}</p>
						</li>
					))}
			</ul>
			<h2>Songs</h2>
			<ul>
				{songsArray &&
					songsArray.map((item) => (
						<li
							key={item.videoId}
							onClick={() => updateMusicContext({ nowPlaying: item.videoId })}>
							<p>{item.name}</p>
						</li>
					))}
			</ul>
		</div>
	);
}

export default AllResults;
