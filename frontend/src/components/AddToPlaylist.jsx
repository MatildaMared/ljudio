import React, { useState, useContext } from 'react';
import { MdList } from 'react-icons/md';
import { UserContext } from '../context/UserContext';
import ChoosePlaylist from './ChoosePlaylist';

// import { addSongToPlaylist } from '../services/playlistService/addSongToPlaylist';

function AddToPlaylist(song) {
  const [userContext, updateUserContext] = useContext(UserContext);

  const addSongToPlaylist = () => {};

  const choosePlaylistToAddSong = () => {
    userContext.user.playlists.map((playlist) => {
      console.log(playlist.title);
      console.log(playlist._id);
    });
  };

  return (
    <div>
      <button onClick={(e) => choosePlaylistToAddSong(e.target.value)}>
        <MdList />
      </button>
      {/* <ChoosePlaylist playlist={playlist.title} /> */}
    </div>
  );
}

export default AddToPlaylist;
