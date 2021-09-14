import React, { useEffect, useState, useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { getPlaylist } from "./../services/playlistService";
import { MdDeleteForever } from "react-icons/md";
import { removeSongFromPlaylist } from "./../services/playlistService";

const PlaylistPage = () => {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [userContext, updateUserContext] = useContext(UserContext);
	const { playlistId } = useParams();
	const [playlistData, setPlaylistData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isOwner, setIsOwner] = useState(false);

	// on page load, get the playlist data
	// from the database
	useEffect(async () => {
		getPlaylistData(playlistId);
	}, []);

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

	return (
		<div style={{ padding: "2rem 0rem" }}>
			{isLoading && <h3>Loading...</h3>}
			{isOwner && <h2>You are the owner of this playlist!</h2>}
			{playlistData && (
				<section className="playlist">
					<h1>{playlistData.title}</h1>
					<ul>
						{playlistData.songs &&
							playlistData.songs.map((song) => (
								<li
									key={song.videoId}
									style={{ display: "flex", alignItems: "center" }}>
									<h3>
										{song.name} – {song.artist.name}
									</h3>
									{isOwner && (
										<button>
											<MdDeleteForever
												style={{ fontSize: "1.5rem" }}
												onClick={() => removeSongHandler(song.videoId)}
											/>
										</button>
									)}
								</li>
							))}
					</ul>
				</section>
			)}
		</div>
	);
};

export default PlaylistPage;
