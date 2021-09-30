import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import { MdPlayArrow } from 'react-icons/md';

function PlaySongBtn({ item }) {
  const [musicContext, updateMusicContext] = useContext(MusicContext);

  const playSong = (song) => {
    if (musicContext.queue.length === 0) {
      updateMusicContext({
        queue: [...musicContext.queue, song],
        nowPlayingIndex: 0,
        resetPlayer: true,
      });
    } else {
      const newPlayQueue = [...musicContext.queue];
      newPlayQueue.splice(musicContext.nowPlayingIndex, 0, song);
      updateMusicContext({
        queue: newPlayQueue,
        nowPlayingIndex: musicContext.nowPlayingIndex || 0,
        resetPlayer: true,
      });
    }
  };

  return (
    <button className="play__btn" onClick={() => playSong(item)}>
      <MdPlayArrow className="play__icon" />
    </button>
  );
}

export default PlaySongBtn;
