import React, { useContext } from "react";
import { MusicContext } from "./../context/MusicContext";
import { getArtistById, getAlbumById } from "./../services/musicService";

function AllResults() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	console.log(musicContext.fetchResult);
	let songsArray = [];
	let artistsArray = [];
	let albumsArray = [];

	// Takes in a single array of items and
	// sorts items into on of three arrays
	// based on type (album, song, artist)
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
	}

	sortResults(musicContext.fetchResult.content);

	async function displaySingleAlbum(browseId) {
		console.log(browseId);
		const data = await getAlbumById(browseId);
		console.log(data);
	}

	async function displaySingleArtist(browseId) {
		const data = await getArtistById(browseId);
		console.log(data);
	}

	return (
		<div className="all-results">
			<h1>All Results</h1>
			<h2>Artists</h2>
			<ul>
				{artistsArray &&
					artistsArray.map((item) => (
						<li
							key={item.browseId}
							onClick={() => displaySingleArtist(item.browseId)}>
							<p>{item.name}</p>
						</li>
					))}
			</ul>
			<h2>Albums</h2>
			<ul>
				{albumsArray &&
					albumsArray.map((item) => (
						<li
							key={item.browseId}
							onClick={() => displaySingleAlbum(item.browseId)}>
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
							onClick={() => updateMusicContext({ nowPlaying: item })}>
							<p>{item.name}</p>
						</li>
					))}
			</ul>
		</div>
	);
}

export default AllResults;
