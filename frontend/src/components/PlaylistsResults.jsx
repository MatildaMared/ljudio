import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { MdPlayCircleFilled, MdMoreHoriz } from "react-icons/md";
import { getPlaylistById } from "./../services/musicService";

function PlaylistsResults() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [playlistData, setPlaylistData] = useState(null);
	const playlists = musicContext.fetchResult.content;

	async function onPlayHandler(browseId) {
		const data = await getPlaylistById(browseId);
		setPlaylistData(data.content);
		updateMusicContext({
			queue: data.content,
			nowPlayingIndex: 0,
			resetPlayer: true,
		});
	}

	return (
		<section className="yt-playlists">
			<h1 className="yt-playlists__header">YouTube Playlists</h1>
			<ul className="yt-playlists__list">
				{playlists.map((playlist) => (
					<li className="yt-playlists__item" key={playlist.browseId}>
						<div className="yt-playlists__info">
							<Link
								to={`/yt-playlist/${playlist.browseId}`}
								className="yt-playlists__link">
								<p className="yt-playlists__title">{playlist.title}</p>
							</Link>
							<p className="yt-playlists__author">by {playlist.author}</p>
						</div>
						<div className="yt-playlists__btns">
							<MdPlayCircleFilled
								className="yt-playlists__icon"
								onClick={() => {
									onPlayHandler(playlist.browseId);
								}}
							/>
							<Link
								to={`/yt-playlist/${playlist.browseId}`}
								className="yt-playlists__link">
								<div className="yt-playlists__more">
									<MdMoreHoriz className="yt-playlists__more-icon" />
								</div>
							</Link>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}

export default PlaylistsResults;
