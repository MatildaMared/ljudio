import React, { useState, useEffect, useRef, useContext } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { UserContext } from '../context/UserContext';
import { addSongToPlaylist } from '../services/playlistService';
import { getSongsByString } from '../services/musicService';

function ArtistPageAddToPlaylistBtn({ songName, artistName }) {
  const [userContext, updateUserContext] = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [addedToPlaylistMessage, setAddedToPlaylistMessage] = useState('');
  const ref = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAddedToPlaylistMessage('');
      setIsActive(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [addedToPlaylistMessage]);

  useEffect(() => {
    const checkIfClickedOutsideOfMenu = (e) => {
      if (showModal && ref.current && !ref.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutsideOfMenu);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutsideOfMenu);
    };
  }, [showModal]);

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
        setShowModal(false);
        return;
      }
    }
  };

  return (
    <div className="add-to-playlist" ref={ref}>
      <span
        className={
          isActive
            ? 'add-to-playlist__message'
            : 'add-to-playlist__message--hide'
        }
      >
        {addedToPlaylistMessage || null}
      </span>
      <button
        className={
          showModal
            ? 'add-to-playlist__btn add-to-playlist__btn--active'
            : 'add-to-playlist__btn'
        }
        onClick={() => setShowModal((oldState) => !oldState)}
      >
        <MdMoreHoriz className="add-to-playlist__icon" />
      </button>
      <div className="add-to-playlist__menu">
        <div
          className="add-to-playlist__menu-content"
          onClick={(e) => e.stopPropagation()}
        >
          {showModal && (
            <ul className="add-to-playlist__list">
              <h2 className="add-to-playlist__heading">Add to playlist</h2>
              {userContext.user.playlists.map((playlist) => (
                <li
                  key={playlist._id}
                  onClick={() => {
                    addSongToThisPlaylist(playlist._id);
                    setAddedToPlaylistMessage(`Added to playlist`);
                    setIsActive(true);
                  }}
                  className={
                    showModal
                      ? 'add-to-playlist__item'
                      : 'add-to-playlist__item add-to-playlist__item--hide'
                  }
                >
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
