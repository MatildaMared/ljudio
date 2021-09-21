import React, { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import { MusicContext } from "./../context/MusicContext";
import { addPlaylist, removePlaylist } from "./../services/playlistService";
import { MdDeleteForever, MdTrackChanges } from "react-icons/md";
import { changePlayListTitle } from "../services/newPlaylistService";

function PlaylistsPage() {
	const [userContext, updateUserContext] = useContext(UserContext);
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [titleInput, setTitleInput] = useState("");
	const [titleChange, setTitleChange] = useState("");
	const history = useHistory();
	const inputRef = useRef();

	function playSong(song) {
		updateMusicContext({
			nowPlaying: song,
		});
	}

	// Makes a GET request to database to create
	// a new playlist, then update user in
	// user context to the new user from
	// the http response
	async function newPlaylistHandler(e) {
		e.preventDefault();
		const data = await addPlaylist(titleInput.trim());
		updateUserContext({
			user: data.user,
		});
		setTitleInput("");
		inputRef.current.blur();
	}

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

	async function changeTitleHandler (playlistId, playlistTitle, e) {
		e.preventDefault();
		console.log(playlistId, playlistTitle);

		const data = await changePlayListTitle(playlistId, playlistTitle)
		updateUserContext({
			user: data.user,
		});
	}

	return (
		<div className="main-wrapper">
			<h1>Playlists</h1>
			<form
				onSubmit={newPlaylistHandler}
				className="add-playlist"
				style={{ marginBottom: "2rem" }}>
				<input
					value={titleInput}
					ref={inputRef}
					onChange={(e) => setTitleInput(e.target.value)}
					placeholder="Title"
					type="text"
					name="title"
					id="title"
					className="add-playlist__input"
				/>
				<input
					type="submit"
					value="Add Playlist"
					className="add-playlist__btn"
				/>
			</form>
			{userContext.user?.playlists?.length > 0 &&
				userContext.user.playlists.map((playlist) => (
					<div className="results-items" key={playlist._id}>
						<p
							className="results-items__name"
							onClick={() => history.push(`/playlist/${playlist._id}`)}>
							{playlist.title}
						</p>
						<MdDeleteForever
							className="results-items__btn"
							onClick={() => removePlaylistHandler(playlist._id)}
						/>
						<form onSubmit={() => changeTitleHandler(playlist._id, playlist.title)}>
							<input 
								type="text"
								placeholder="Change playlist name"/>
							<input type="submit" />
						</form>

					</div>
				))}
		</div>
	);
}

export default PlaylistsPage;
