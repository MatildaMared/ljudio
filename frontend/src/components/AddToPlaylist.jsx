import React, { useState, useContext } from 'react';
import { MdMoreVert } from 'react-icons/md';
import { UserContext } from '../context/UserContext';
import { addSongToPlaylist } from '../services/playlistService';

function AddToPlaylist({ item }) {
  const [userContext, updateUserContext] = useContext(UserContext);
  const [toggle, setToggle] = useState(false);

  const addSongToThisPlaylist = async (playlist, song) => {
    console.log(`Playlist with the id: ${playlist} and song: ${song.name}`);
    const res = await addSongToPlaylist(playlist, song);
  };

  return (
    <div>
      <div className="add-to-playlist-modal">
        <div
          className="add-to-playlist-modal__content"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="add-to-playlist-modal__ul">
            {toggle &&
              userContext.user.playlists.map((playlist) => (
                <li
                  key={playlist._id}
                  onClick={() => addSongToThisPlaylist(playlist._id, item)}
                  className={toggle ? 'show-playlist' : 'show-playlist--hide'}
                >
                  {playlist.title}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <button
        className="add-to-playlist-modal__btn"
        onClick={() => setToggle(!toggle)}
      >
        <MdMoreVert />
      </button>
    </div>
  );
}

export default AddToPlaylist;
