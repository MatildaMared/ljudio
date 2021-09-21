import React, { useContext } from "react";
import { MusicContext } from "./../context/MusicContext";
import { MdDeleteForever } from "react-icons/md";
import { getArtistNameFromSongObj } from "./../utilities/musicUtils";

function QueuePage() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const musicQueue = musicContext.queue;
	const nowPlayingIndex = musicContext.nowPlayingIndex;

	async function handleDelete(itemId) {
		const newPlayQueue = [...musicQueue];

		newPlayQueue.splice(itemId, 1);

		await updateMusicContext({
			queue: newPlayQueue,
		});
	}

	return (
		<section className="queue-page">
			<h1 className="queue-page__header">Queue</h1>
			<ul className="queue-page__list">
				{musicQueue &&
					musicQueue.map((item, index) => {
						if (index >= nowPlayingIndex) {
							return (
								<li
									key={index}
									className={
										index === nowPlayingIndex
											? "queue-page__item queue-page__item--now-playing"
											: "queue-page__item"
									}>
									{index === nowPlayingIndex && (
										<span className="queue-page__now-playing">Now Playing</span>
									)}
									<div className="queue-page__song-info">
										<p className="queue-page__artist">
											{getArtistNameFromSongObj(item)}
										</p>
										<p className="queue-page__song">{item.name}</p>
									</div>
									<MdDeleteForever
										className="queue-page__list__btn"
										onClick={() => handleDelete(index)}
									/>
								</li>
							);
						}
					})}
			</ul>
		</section>
	);
}

export default QueuePage;
