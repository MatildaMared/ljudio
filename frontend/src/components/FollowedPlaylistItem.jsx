import React, { useState, useContext } from "react";
import { MdPlayArrow } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";

function FollowedPlaylistItem({ playlist }) {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const history = useHistory();

	function playEntirePlaylist() {
		updateMusicContext({
			queue: playlist.songs,
			nowPlayingIndex: 0,
			resetPlayer: true,
		});
	}

	return (
		<li className="playlist-item playlist-item--followed">
			<div className="playlist-item__wrapper">
				<h1
					className="playlist-item__title"
					onClick={() => history.push(`/playlist/${playlist._id}`)}>
					{playlist.title}
				</h1>
				<div className="playlist-item__btns">
					<button className="playlist-item__btn" onClick={playEntirePlaylist}>
						<MdPlayArrow className="playlist-item__icon" />
					</button>
				</div>
			</div>
		</li>
	);
}

export default FollowedPlaylistItem;
