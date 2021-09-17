import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import { MdPlayCircleFilled } from 'react-icons/md';

function PlaySongBtn({ item }) {
  const [musicContext, updateMusicContext] = useContext(MusicContext);

  const playSong = (song) => {
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
  };

  return (
    <div>
      <button className="play__btn" onClick={() => playSong(item)}>
        <MdPlayCircleFilled />
      </button>
    </div>
  );
}

export default PlaySongBtn;
