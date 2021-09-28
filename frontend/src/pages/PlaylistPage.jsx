import React, { useEffect, useState, useContext, useRef } from "react";
import { MusicContext } from "../context/MusicContext";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import {
	getPlaylist,
	followPlaylist,
	unfollowPlaylist,
} from "./../services/playlistService";
import {
	MdDeleteForever,
	MdPlayCircleFilled,
	MdFavorite,
	MdFavoriteBorder,
} from "react-icons/md";
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
	const [ownerName, setOwnerName] = useState(null);
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
		setOwnerName(data.owner);
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
			setIsFollowingPlaylist(true);
		}
	}
	async function onUnfollowPlaylistHandler() {
		console.log("Will try to unfollow");
		const data = await unfollowPlaylist(playlistId);
		if (data.success) {
			console.log("Success, updating user context");
			updateUserContext({
				user: data.user,
			});
			setIsFollowingPlaylist(false);
		}
	}

	return (
		<section className="playlist-page">
			{isLoading && <h3 className="playlist__loading">Loading...</h3>}
			{playlistData && (
				<div className="playlist-page__wrapper">
					<header className="playlist-page__header">
						<div>
							<h1 className="playlist-page__heading">{playlistData.title}</h1>
							{!isOwner && (
								<p className="playlist-page__owner-text">
									Made by <strong>{ownerName}</strong>
								</p>
							)}
							{isFollowingPlaylist && (
								<p className="playlist-page__following-text">
									You are following this playlist! 💜
								</p>
							)}
						</div>
						<button
							className="playlist-page__play-all-btn"
							ref={playAllBtnRef}
							onClick={() => {
								playEntirePlaylist(playlistData.songs);
							}}>
							Play entire list
							<MdPlayCircleFilled className="playlist-page__play-all-icon" />
						</button>
					</header>
					<div className="playlist-page__btns">
						{!isOwner && !isFollowingPlaylist && (
							<button
								className="playlist-page__follow-btn"
								onClick={onFollowPlaylistHandler}>
								Follow this playlist
								<MdFavorite className="playlist-page__follow-icon" />
							</button>
						)}
						{!isOwner && isFollowingPlaylist && (
							<button
								className="playlist-page__unfollow-btn"
								onClick={onUnfollowPlaylistHandler}>
								Unfollow this playlist
								<MdFavoriteBorder className="playlist-page__unfollow-icon" />
							</button>
						)}
						<ShareLinkBtn />
					</div>

					<ul className="playlist-page__list">
						<h2 className="playlist-page__list-heading">Songs</h2>
						{playlistData.songs &&
							playlistData.songs.map((song) => (
								<li className="playlist-page__item" key={song.videoId}>
									<div className="playlist__wrapper__description__li__content">
										{song.thumbnails && (
											<img
												src={getThumbNailUrlFromSongObj(song)}
												alt={song.name}
												className="playlist-page__thumbnail"
											/>
										)}

										<div className="playlist-page__song">
											<h3 className="playlist-page__title">{song.name}</h3>
											<h4 className="playlist-page__artist">
												{getArtistNameFromSongObj(song)}
											</h4>
										</div>
									</div>
									<div className="playlist-page__btns">
										<PlaySongBtn item={song} />
										{isOwner && (
											<button className="playlist-page__delete-btn">
												<MdDeleteForever
													className="playlist-page__delete-icon"
													onClick={() => removeSongHandler(song.videoId)}
												/>
											</button>
										)}
									</div>
								</li>
							))}
					</ul>
				</div>
			)}
		</section>
	);
};

export default PlaylistPage;
