import React, { useState, useEffect, useRef, useContext } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import { addSongToPlaylist } from "../services/playlistService";
import { getSongsByString } from "../services/musicService";

function ArtistPageAddToPlaylistBtn({ songName, artistName }) {
	const [userContext, updateUserContext] = useContext(UserContext);
	const [isActive, setIsActive] = useState(false);
	const ref = useRef();

	useEffect(() => {
		const checkIfClickedOutsideOfMenu = (e) => {
			if (isActive && ref.current && !ref.current.contains(e.target)) {
				setIsActive(false);
			}
		};

		document.addEventListener("mousedown", checkIfClickedOutsideOfMenu);
		return () => {
			document.removeEventListener("mousedown", checkIfClickedOutsideOfMenu);
		};
	}, [isActive]);

	const addSongToThisPlaylist = async (playlist) => {
		// Make a fetch request to return
		// an array of songs by a search string
		const data = await getSongsByString(`${songName} ${artistName}`);

		// Iterate over the array
    for (const song of data.content) {
			// If the artist name of the song is the same
			// as the current artist, update the context
			// and break out of the loop
			if (song.artist.name.toLowerCase() === artistName.toLowerCase()) {
        const res = await addSongToPlaylist(playlist, song);
        setIsActive(false);
        return;
			}
		}
	};

	return (
		<div className="add-to-playlist" ref={ref}>
			<button
				className={
					isActive
						? "add-to-playlist__btn add-to-playlist__btn--active"
						: "add-to-playlist__btn"
				}
				onClick={() => setIsActive((oldState) => !oldState)}>
				<MdMoreHoriz className="add-to-playlist__icon" />
			</button>
			<div className="add-to-playlist__menu">
				<div
					className="add-to-playlist__menu-content"
					onClick={(e) => e.stopPropagation()}>
					{isActive && (
						<ul className="add-to-playlist__list">
							<h2 className="add-to-playlist__heading">Add to playlist</h2>
							{userContext.user.playlists.map((playlist) => (
								<li
									key={playlist._id}
									onClick={() => addSongToThisPlaylist(playlist._id)}
									className={
										isActive
											? "add-to-playlist__item"
											: "add-to-playlist__item add-to-playlist__item--hide"
									}>
									<p className="add-to-playlist__title">{playlist.title}</p>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

export default ArtistPageAddToPlaylistBtn;
