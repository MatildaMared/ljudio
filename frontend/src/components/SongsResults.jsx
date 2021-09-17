import React, { useContext, useState } from 'react';
import { MusicContext } from '../context/MusicContext';
import PlaySongBtn from './PlaySongBtn';
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

  return (
    <section className="result">
      <h1>Songs</h1>
      <ul>
        {musicContext.fetchResult.content.map((item) => (
          <li key={item.videoId}>
            <PlaySongBtn item={item} />
            <AddToPlayQueue item={item} />
            {`${item.name} by ${item.artist.name}`}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SongsResults;
