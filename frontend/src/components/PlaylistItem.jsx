import React, { useState, useContext } from "react";
import { MdDeleteForever, MdEdit, MdPlayArrow } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import {
	removePlaylist,
	changePlayListTitle,
} from "./../services/playlistService";
import { useHistory } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { getThumbNailUrlFromSongObj } from "../utilities/musicUtils";
import ThumbnailImages from './ThumbnailImages';

function PlaylistItem({ playlist }) {
	const [userContext, updateUserContext] = useContext(UserContext);
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [showMore, setShowMore] = useState(false);
	const [titleInput, setTitleInput] = useState("");
	const history = useHistory();

	// Makes a DELETE request to database
	// to remove a playlist, then update user
	// in user context to the new user from
	// the http response
	async function removePlaylistHandler(playlistId) {
		const data = await removePlaylist(playlistId);
		updateUserContext({
			user: data.user,
		});
	}

	async function changeTitleHandler(playlistId) {
		const data = await changePlayListTitle(titleInput.trim(), playlistId);
		updateUserContext({
			user: data.user,
		});
		setTitleInput("");

		setShowMore(false);
	}

	function playEntirePlaylist() {
		updateMusicContext({
			queue: playlist.songs,
			nowPlayingIndex: 0,
			resetPlayer: true,
		});
	}

	return (
		<li className="playlist-item">
			<div className="playlist-item__wrapper">
				<ThumbnailImages playlist={playlist} />
				<h1
					className="playlist-item__title"
					onClick={() => history.push(`/playlist/${playlist._id}`)}>
					{playlist.title}
				</h1>
				<div className="playlist-item__btns">
					<button className="playlist-item__btn" onClick={playEntirePlaylist}>
						<MdPlayArrow className="playlist-item__icon" />
					</button>
					<button className="playlist-item__btn">
						<MdEdit
							className="playlist-item__icon"
							onClick={() => setShowMore(!showMore)}
						/>
					</button>
					<button className="playlist-item__btn playlist-item__btn--delete">
						<MdDeleteForever
							className="playlist-item__icon playlist-item__icon--delete"
							onClick={() => removePlaylistHandler(playlist._id)}
						/>
					</button>
				</div>
			</div>
			{showMore && (
				<div className="playlist-item__change-title">
					<h3 className="playlist-item__change-title-heading">Change title</h3>
					<input
						className="playlist-item__input"
						type="text"
						placeholder="New title..."
						onChange={(e) => setTitleInput(e.target.value)}
						value={titleInput}
					/>
					<button
						className="playlist-item__change-title-btn"
						type="submit"
						onClick={() => changeTitleHandler(playlist._id)}>
						Submit
					</button>
				</div>
			)}
		</li>
	);
}

export default PlaylistItem;
