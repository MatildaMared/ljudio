import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import { MusicContext } from "./../context/MusicContext";
import { addPlaylist, removePlaylist } from "./../services/playlistService";
import WarningModal from "../modals/WarningModal";
import { MdDeleteForever } from "react-icons/md";

function PlaylistsPage() {
	const [userContext, updateUserContext] = useContext(UserContext);
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [titleInput, setTitleInput] = useState("");
	//Show or hide modal that displays a warning when user deletes a playlist
	const [show, setShow] = useState(false);
	const history = useHistory();

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
	}

	// Makes a DELETE request to database
	// to remove a playlist, then update user
	// in user context to the new user from
	// the http response
	async function removePlaylistHandler(playlistId) {
		setShow(false);
		const data = await removePlaylist(playlistId);
		updateUserContext({
			user: data.user,
		});
	}

	function showModal () {
		setShow(true);
	}

	return (
		<div style={{ padding: "2rem 0" }}>
			<h1>Playlists</h1>
			<form
				onSubmit={newPlaylistHandler}
				className="add-playlist"
				style={{ marginBottom: "2rem" }}>
				<input
					value={titleInput}
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
					<div
						key={playlist._id}
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "1rem",
						}}>
						<h2
							style={{ marginBottom: "0" }}
							onClick={() => history.push(`/playlist/${playlist._id}`)}>
							{playlist.title}
						</h2>
						<MdDeleteForever
							style={{ color: "#5b5b5b", fontSize: "2rem" }}
							//onClick={() => removePlaylistHandler(playlist._id)}
							onClick={showModal}
						/>
						<WarningModal title="Warning" onClose={() => setShow(false)} onDelete={() => removePlaylistHandler(playlist._id)} show={show}>
        					<p>Are you sure you want to delete this playlist?</p>
      					</WarningModal>
					</div>
				))}

		</div>
	);
}

export default PlaylistsPage;
