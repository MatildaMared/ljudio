import React, { useState, useEffect, useRef, useContext } from 'react';
import { MdMoreVert } from 'react-icons/md';
import { UserContext } from '../context/UserContext';
import { addSongToPlaylist } from '../services/playlistService';

function AddToPlaylist({ item }) {
  const [userContext, updateUserContext] = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutsideOfModal = (e) => {
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutsideOfModal);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutsideOfModal);
    };
  }, [isActive]);

  const addSongToThisPlaylist = async (playlist, song) => {
    console.log(
      `In AddToPlaylist.jsx - Playlist with the id: ${playlist} and song: ${song.name}`
    );
    const res = await addSongToPlaylist(playlist, song);
    setIsActive(false);
  };

  return (
    <div className="ref-wrapper" ref={ref}>
      <button
        className="add-to-playlist-modal__btn"
        onClick={() => setIsActive((oldState) => !oldState)}
      >
        <MdMoreVert />
      </button>
      <div className="add-to-playlist-modal">
        <div
          className="add-to-playlist-modal__content"
          onClick={(e) => e.stopPropagation()}
        >
          {isActive && (
            <ul className="add-to-playlist-modal__ul">
              <h2>Add to playlist</h2>
              {userContext.user.playlists.map((playlist) => (
                <li
                  key={playlist._id}
                  onClick={() => addSongToThisPlaylist(playlist._id, item)}
                  className={isActive ? 'show-playlist' : 'show-playlist--hide'}
                >
                  {playlist.title}
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