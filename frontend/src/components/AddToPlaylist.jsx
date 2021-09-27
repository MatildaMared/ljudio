import React, { useState, useEffect, useRef, useContext } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import { addSongToPlaylist } from "../services/playlistService";

function AddToPlaylist({ item }) {
	console.log("Item is: ", item);
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

	const addSongToThisPlaylist = async (playlist, song) => {
		const res = await addSongToPlaylist(playlist, song);
		setIsActive(false);
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
									onClick={() => addSongToThisPlaylist(playlist._id, item)}
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

export default AddToPlaylist;
