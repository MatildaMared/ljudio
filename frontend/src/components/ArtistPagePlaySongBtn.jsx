import React, { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { MdPlayArrow } from "react-icons/md";
import { getSongsByString } from "../services/musicService";

function ArtistPagePlaySongBtn({ songName, artistName }) {
	const [musicContext, updateMusicContext] = useContext(MusicContext);

	const playSong = async () => {
		// Make a fetch request to return
		// an array of songs by a search string
		const data = await getSongsByString(`${songName} ${artistName}`);

		// Iterate over the array
		for (const song of data.content) {
			// If the artist name of the song is the same
			// as the current artist, update the context
			// and break out of the loop
			if (song.artist.name.toLowerCase() === artistName.toLowerCase()) {
				if (musicContext.queue.length === 0) {
					updateMusicContext({
						queue: [...musicContext.queue, song],
						nowPlayingIndex: 0,
						resetPlayer: true,
					});
				} else {
					const newPlayQueue = [...musicContext.queue];
					newPlayQueue.splice(musicContext.nowPlayingIndex, 0, song);
					updateMusicContext({
						queue: newPlayQueue,
						nowPlayingIndex: musicContext.nowPlayingIndex || 0,
						resetPlayer: true,
					});
				}
				return;
			}
		}
	};

	return (
		<button className="play__btn" onClick={playSong}>
			<MdPlayArrow className="play__icon" />
		</button>
	);
}

export default ArtistPagePlaySongBtn;
