import React, { useContext, useState, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";
import { MdPlaylistAdd } from "react-icons/md";
import { getSongsByString } from "../services/musicService";

function ArtistPageAddToQueueBtn({ songName, artistName }) {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [queueMessage, setQueueMessage] = useState("");
	const [isActive, setIsActive] = useState(false);

	//Clears Added to Queue message after 3 seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			setQueueMessage("");
			setIsActive(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, [queueMessage]);

	const addToQueue = async () => {
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
						queue: [song],
						nowPlayingIndex: 0,
					});
				} else {
					updateMusicContext({
						queue: [...musicContext.queue, song],
					});
				}
				return;
			}
		}
	};

	return (
		<>
			<button
				className="queue__btn"
				onClick={() => {
					addToQueue();
					setQueueMessage("Added to Queue");
					setIsActive(true);
				}}>
				<MdPlaylistAdd className="queue__icon" />
			</button>
			<span className={isActive ? "queue-message" : "queue-message--hide"}>
				{queueMessage || null}
			</span>
		</>
	);
}

export default ArtistPageAddToQueueBtn;
