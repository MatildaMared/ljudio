import React, { useContext, useState, useEffect } from 'react';
import { MusicContext } from '../context/MusicContext';
import { MdPlaylistAdd } from 'react-icons/md';

function AddToPlayQueue({ item }) {
  const [musicContext, updateMusicContext] = useContext(MusicContext);

  const addToQueue = (song) => {
    updateMusicContext({
      queue: [...musicContext.queue, song],
    });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <button className="queue__btn" onClick={() => addToQueue(item)}>
        <MdPlaylistAdd />
      </button>
    </div>
  );
}

export default AddToPlayQueue;
