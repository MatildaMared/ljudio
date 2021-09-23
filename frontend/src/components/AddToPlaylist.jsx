import React, { useState, useContext } from 'react';
import { MdMoreVert } from 'react-icons/md';
import { UserContext } from '../context/UserContext';
import { addSongToPlaylist } from '../services/playlistService';

function AddToPlaylist({ item }) {
  const [userContext, updateUserContext] = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);

  const addSongToThisPlaylist = async (playlist, song) => {
    console.log(`Playlist with the id: ${playlist} and song: ${song.name}`);
    const res = await addSongToPlaylist(playlist, song);
  };

  // window.onclick = function () {
  //   if (isActive === true) {
  //     setIsActive(false);
  //   }
  // };

  return (
    <div>
      <div
        className="add-to-playlist__modal"
        onClick={() => setIsActive(false)}
      >
        <ul className="add-to-playlist__modal--ul">
          {isActive &&
            userContext.user.playlists.map((playlist) => (
              <li
                key={playlist._id}
                onClick={() => addSongToThisPlaylist(playlist._id, item)}
                className={isActive ? 'show-playlist' : 'show-playlist--hide'}
              >
                {playlist.title}
              </li>
            ))}
        </ul>
      </div>
      <button onClick={() => setIsActive(true)}>
        <MdMoreVert />
      </button>
    </div>
  );
}

export default AddToPlaylist;
