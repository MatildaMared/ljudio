import React, { useEffect, useState, useContext, useRef } from "react";
import { MusicContext } from "../context/MusicContext";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { getPlaylist } from "./../services/playlistService";
import { MdDeleteForever, MdPlayCircleFilled } from "react-icons/md";
import { removeSongFromPlaylist } from "./../services/playlistService";
import PlaySongBtn from "../components/PlaySongBtn";
import {
	getArtistNameFromSongObj,
	getThumbNailUrlFromSongObj,
} from "../utilities/musicUtils";
import ShareLinkBtn from "./../components/ShareLinkBtn";

const PlaylistPage = () => {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [userContext, updateUserContext] = useContext(UserContext);
	const { playlistId } = useParams();
	const [playlistData, setPlaylistData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isOwner, setIsOwner] = useState(false);
	const [isFollowingPlaylist, setIsFollowingPlaylist] = useState(false);
	const playAllBtnRef = useRef();

	// on page load, get the playlist data
	// from the database
	useEffect(async () => {
		getPlaylistData(playlistId);
	}, []);

	useEffect(() => {
		console.log(userContext.user);
		userContext.user.followedPlaylists.forEach((playlist) => {
			if (playlistId === playlist._id) {
				console.log("Found the playlist in user playlists");
				setIsFollowingPlaylist(true);
			}
		});
	}, [userContext.user]);

	// If the userId of the playlist is the same
	// as the id of the logged in user,
	// set isOwner to true so that we can display
	// functionality only meant for the owner,
	// like deleting a playlist
	useEffect(() => {
		if (userContext.user.id === playlistData?.userId) {
			setIsOwner(true);
		}
	}, [userContext, playlistData]);

	// Make a request to the database
	// to get the playlist, then update
	// playlistData variable with the playlist data
	// and set isLoading variable to false to be
	// able to display the data
	async function getPlaylistData(playlistId) {
		const data = await getPlaylist(playlistId);
		setPlaylistData(data.playlist);
		setIsLoading(false);
	}

	async function removeSongHandler(videoId) {
		const playlistId = playlistData._id;
		const data = await removeSongFromPlaylist(playlistId, videoId);
		console.log(data);
		setPlaylistData(data.updatedPlaylist);
		updateUserContext({
			user: data.user,
		});
	}

	function playEntirePlaylist(songArr) {
		updateMusicContext({
			queue: songArr,
			nowPlayingIndex: 0,
			resetPlayer: true,
		});
		playAllBtnRef.current.blur();
	}

	async function onFollowPlaylistHandler() {
		const data = await followPlaylist(playlistId);
		if (data.success) {
			console.log("Success, updating user context");
			updateUserContext({
				user: data.user,
			});
		}
	}

	async function followPlaylist(playlistId) {
		const token = localStorage.getItem("token");

		console.log(playlistId);

		const response = await fetch(`/api/playlist/follow/${playlistId}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		console.log(data);
		return data;
	}

	async function onUnfollowPlaylistHandler() {
		console.log("Will try to unfollow");
	}

	return (
		<div className="playlist">
			{isLoading && <h3 className="playlist__loading">Loading...</h3>}
			{isOwner && (
				<h2 className="playlist__header">
					You are the owner of this playlist!
				</h2>
			)}
			{playlistData && (
				<section className="playlist__wrapper">
					<header className="playlist__wrapper__heading">
						<h1 className="playlist__heading">{playlistData.title}</h1>
						<button
							className="playlist__wrapper__heading__btn"
							ref={playAllBtnRef}
							onClick={() => {
								playEntirePlaylist(playlistData.songs);
							}}>
							<h1>Play entire list </h1>
							<MdPlayCircleFilled className="playlist__wrapper__heading__icon" />
						</button>
					</header>
					<div className="playlist__icons">
						<ShareLinkBtn />
						{!isOwner && !isFollowingPlaylist && (
							<button
								className="playlist__follow-btn"
								onClick={onFollowPlaylistHandler}>
								Follow this playlist
							</button>
						)}
						{!isOwner && isFollowingPlaylist && (
							<button
								className="playlist__unfollow-btn"
								onClick={onUnfollowPlaylistHandler}>
								Unfollow this playlist
							</button>
						)}
					</div>

					<ul className="playlist__wrapper__description">
						{playlistData.songs &&
							playlistData.songs.map((song) => (
								<li
									className="playlist__wrapper__description__li"
									key={song.videoId}>
									<div className="playlist__wrapper__description__li__content">
										{song.thumbnails && (
											<img
												src={getThumbNailUrlFromSongObj(song)}
												alt={song.name}
												className="playlist__wrapper__description__img"
											/>
										)}

										<div className="playlist__wrapper__description__song">
											<h3 className="playlist__wrapper__description__title">
												{song.name}
											</h3>
											<h4 className="playlist__wrapper__description__artist">
												{getArtistNameFromSongObj(song)}
											</h4>
										</div>
									</div>
									<div className="playlist__btn">
										<PlaySongBtn item={song} />
										{isOwner && (
											<button className="playlist__btn--delete">
												<MdDeleteForever
													onClick={() => removeSongHandler(song.videoId)}
												/>
											</button>
										)}
									</div>
								</li>
							))}
					</ul>
				</section>
			)}
		</div>
	);
};

export default PlaylistPage;
