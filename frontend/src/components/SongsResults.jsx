import React, { useContext, useState } from 'react';
import { MusicContext } from '../context/MusicContext';
import { FaPlay } from 'react-icons/fa';
import { AiFillDatabase } from 'react-icons/ai';
import AddToPlayQueue from '../components/AddToPlayQueue';

function SongsResults() {
  const [musicContext, updateMusicContext] = useContext(MusicContext);

  function playSong(song) {
    if (musicContext.queue.length === 0) {
      updateMusicContext({
        queue: [...musicContext.queue, song],
        nowPlayingIndex: 0,
      });
    } else {
      const newPlayQueue = [...musicContext.queue];
      newPlayQueue.splice(musicContext.nowPlayingIndex + 1, 0, song);
      updateMusicContext({
        queue: newPlayQueue,
        nowPlayingIndex: musicContext.nowPlayingIndex + 1,
      });
    }
  }

  const addToQueue = (song) => {
    updateMusicContext({
      queue: [...musicContext.queue, song],
    });
  };

  return (
    <section className="result">
      <h1>Songs</h1>
      <ul>
        {musicContext.fetchResult.content.map((item) => (
          <li key={item.videoId}>
            <button
              onClick={() => playSong(item)}
              style={{ marginRight: '.3rem' }}
            >
              <AddToPlayQueue />
              <FaPlay />
            </button>
            <button onClick={() => addToQueue(item)}>
              <AiFillDatabase />
            </button>
            {`${item.name} by ${item.artist.name}`}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SongsResults;
