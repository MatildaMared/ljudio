import React, { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import { MusicContext } from "./../context/MusicContext";
import { addPlaylist, removePlaylist } from "./../services/playlistService";
import { MdDeleteForever, MdTrackChanges } from "react-icons/md";

function ChangePlaylistTitle() {
    const [userContext, updateUserContext] = useContext(UserContext);
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [titleChange, setTitleChange] = useState("");
	const history = useHistory();
	const inputRef = useRef();

    function changeTitleHandler (playlistId, playlistTitle) {
		console.log(playlistId, playlistTitle);


	}

    return (
        <div>
            <form
				onSubmit={() => changeTitleHandler(playlist._id, playlist.title)}
				className="add-playlist"
				style={{ marginBottom: "2rem" }}>
				<input
					value={titleChange}
					ref={inputRef}
					onChange={(e) => setTitleChange(e.target.value)}
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
        </div>
    )
}

export default ChangePlaylistTitle
