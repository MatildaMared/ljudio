import React, { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import { MusicContext } from "./../context/MusicContext";
import { addPlaylist, removePlaylist } from "./../services/playlistService";
import { MdDeleteForever, MdMoreVert } from "react-icons/md";
// import ChangePlaylistName from "../components/ChangePlaylistName";
import { changePlayListTitle } from "../services/newPlaylistService";
import PlaylistItem from "../components/PlaylistItem";

function PlaylistsPage() {
	const [userContext, updateUserContext] = useContext(UserContext);
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [titleInput, setTitleInput] = useState("");
	const [titleChange, setTitleChange] = useState("");
	const [showMoreData, setShowMoreData] = useState(false);
	const [toggle, setToggle] = useState(false);
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

	return (
		<section className="playlists">
			<h1 className="playlists__heading">Playlists</h1>
			<form onSubmit={newPlaylistHandler} className="playlists__form">
			<h2 className="playlists__heading playlists__heading--secondary">Create new playlist</h2>
				<input
					value={titleInput}
					ref={inputRef}
					onChange={(e) => setTitleInput(e.target.value)}
					placeholder="Title"
					type="text"
					name="title"
					id="title"
					className="playlists__input"
				/>
				<input
					type="submit"
					value="Add Playlist"
					className="playlists__add-btn"
				/>
			</form>

			{userContext.user?.playlists?.length > 0 && (
					<ul className="playlists__list">
          <h2 className="playlists__heading playlists__heading--secondary">My playlists</h2>
						{userContext.user.playlists.map((playlist) => (
							<PlaylistItem playlist={playlist} key={playlist._id} />
						))}
					</ul>
			)}
		</section>
	);
}

export default PlaylistsPage;
