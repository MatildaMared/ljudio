import React, { useContext } from "react";
import { MusicContext } from "../context/MusicContext";

function SongsResults() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);

	function playSong(song) {
		console.log(song);
		updateMusicContext({
			nowPlaying: song,
		});
	}

	return (
		<section className="result">
			<h1>Songs</h1>
			<ul>
				{musicContext.fetchResult.content.map((item) => (
					<li key={item.videoId} onClick={() => playSong(item)}>
						{`${item.name} by ${item.artist.name}`}
					</li>
				))}
			</ul>
		</section>
	);
}

export default SongsResults;
