import React, { useContext, useState, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";
import { MdPlayCircleFilled } from "react-icons/md";
import { getPlaylistById } from "./../services/musicService";

function PlaylistsResults() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [playlistData, setPlaylistData] = useState(null);
	console.log(musicContext.fetchResult);
	const playlists = musicContext.fetchResult.content;

	async function onPlayHandler(browseId) {
		console.log(browseId);
		const data = await getPlaylistById(browseId);
		console.log(data);
		setPlaylistData(data.content);
		updateMusicContext({
			queue: data.content,
			nowPlayingIndex: 0,
		});
	}

	return (
		<section className="yt-playlists">
			<h1 className="yt-playlists__header">YouTube Playlists</h1>
			<ul className="yt-playlists__list">
				{playlists.map((playlist) => (
					<li className="yt-playlists__item" key={playlist.browseId}>
						<div className="yt-playlists__info">
							<p className="yt-playlists__title">{playlist.title}</p>
							<p className="yt-playlists__author">by {playlist.author}</p>
						</div>
						<div className="yt-playlists__btns">
							<MdPlayCircleFilled
								className="yt-playlists__icon"
								onClick={() => {
									onPlayHandler(playlist.browseId);
								}}
							/>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}

export default PlaylistsResults;
