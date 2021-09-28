import React, { useContext, useRef } from "react";
import { MusicContext } from "./../context/MusicContext";
import { MdDeleteForever, MdPlayCircleFilled, MdClear } from "react-icons/md";
import { getArtistNameFromSongObj } from "./../utilities/musicUtils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function QueuePage() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const musicQueue = musicContext.queue;
	const nowPlayingIndex = musicContext.nowPlayingIndex;
	const playAllBtnRef = useRef();
	const removeAllBtnRef = useRef();

	function handleDelete(itemId) {
		if (musicQueue.length === 1) {
			updateMusicContext({
				queue: [],
				nowPlayingIndex: null,
			});
		}

		const newPlayQueue = [...musicQueue];

		newPlayQueue.splice(itemId, 1);

		if (newPlayQueue.length === nowPlayingIndex) {
			updateMusicContext({
				queue: [],
				nowPlayingIndex: null,
			});
			return;
		}

		updateMusicContext({
			queue: newPlayQueue,
		});
	}

	function onDragEndHandler(result) {
		if (!result.destination) return;

		const newQueue = Array.from(musicQueue);
		const [reorderedItem] = newQueue.splice(result.source.index, 1);
		newQueue.splice(result.destination.index, 0, reorderedItem);

		updateMusicContext({
			queue: newQueue,
		});
	}

	function onPlayAllHandler() {
		if (musicQueue.length === 0) {
			playAllBtnRef.current.blur();
			return;
		}
		if (nowPlayingIndex === null) {
			console.log("nowPlaying is not");
			updateMusicContext({
				nowPlayingIndex: 0,
			});
		} else {
			updateMusicContext({
				resetPlayer: true,
			});
		}
		playAllBtnRef.current.blur();
	}

	function onRemoveAllHandler() {
		updateMusicContext({
			nowPlayingIndex: null,
			queue: [],
		});
		removeAllBtnRef.current.blur();
	}

	return (
		<section className="queue-page">
			<header className="queue-page__header">
				<h1 className="queue-page__heading">Queue</h1>
				<div className="queue-page__btns">
					<button
						className="queue-page__play-all-btn"
						onClick={onPlayAllHandler}
						ref={playAllBtnRef}>
						Play from beginning
						<MdPlayCircleFilled className="queue-page__play-all-icon" />
					</button>
					<button
						className="queue-page__remove-all-btn"
						onClick={onRemoveAllHandler}
						ref={removeAllBtnRef}>
						Remove all
						<MdClear className="queue-page__remove-all-icon" />
					</button>
				</div>
			</header>
			<DragDropContext onDragEnd={onDragEndHandler}>
				<Droppable droppableId="queue">
					{(provided) => (
						<ul
							className="queue-page__list"
							{...provided.droppableProps}
							ref={provided.innerRef}>
							{musicQueue &&
								musicQueue.map((item, index) => {
									if (index >= nowPlayingIndex) {
										return (
											<Draggable
												key={`${item.videoId}-${index}`}
												draggableId={`${item.videoId}-${index}`}
												isDragDisabled={false}
												index={index}>
												{(provided) => (
													<li
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														ref={provided.innerRef}
														className={
															index === nowPlayingIndex
																? "queue-page__item queue-page__item--now-playing"
																: "queue-page__item"
														}>
														{index === nowPlayingIndex && (
															<span className="queue-page__now-playing">
																Now Playing
															</span>
														)}
														<div className="queue-page__song-info">
															<p className="queue-page__artist">
																{getArtistNameFromSongObj(item)}
															</p>
															<p className="queue-page__song">{item.name}</p>
														</div>
														<button
															className="queue-page__delete-btn"
															onClick={() => handleDelete(index)}>
															<MdDeleteForever className="queue-page__delete-icon" />
														</button>
													</li>
												)}
											</Draggable>
										);
									}
								})}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</section>
	);
}

export default QueuePage;
