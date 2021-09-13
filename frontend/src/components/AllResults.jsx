import React, { useContext } from "react";
import { MusicContext } from "./../context/MusicContext";
import { useHistory } from "react-router-dom";

function AllResults() {
	const history = useHistory();
	const [musicContext, updateMusicContext] = useContext(MusicContext);
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

	return (
		<div className="all-results">
			<h1>All Results</h1>
			<h2>Artists</h2>
			<ul>
				{artistsArray &&
					artistsArray.map((item) => (
						<li
							key={item.browseId}
							onClick={() => history.push(`/artist/${item.browseId}`)}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<p>{`${item.name}`}</p>
							<img src={item.thumbnails[0].url} alt={item.name}></img>
						</li>
					))}
			</ul>
			<h2>Albums</h2>
			<ul>
				{albumsArray &&
					albumsArray.map((item) => (
						<li
							key={item.browseId}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<p>{`${item.name}`}</p>
							<img src={item.thumbnails[0].url} alt={item.name}></img>
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
