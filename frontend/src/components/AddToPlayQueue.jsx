import React, { useContext, useState, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";
import { MdPlaylistAdd } from "react-icons/md";

function AddToPlayQueue({ item }) {
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

	const addToQueue = (song) => {
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
	};

	return (
		<article className="queue">
			<button
				className="queue__btn"
				onClick={() => {
					addToQueue(item);
					setQueueMessage("Added to Queue");
					setIsActive(true);
				}}>
				<MdPlaylistAdd className="queue__icon" />
			</button>
			<span className={isActive ? "queue-message" : "queue-message--hide"}>
				{queueMessage || null}
			</span>
		</article>
	);
}

export default AddToPlayQueue;
