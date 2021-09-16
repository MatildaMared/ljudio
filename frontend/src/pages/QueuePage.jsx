import React, { useContext, useState } from 'react';
import { MusicContext } from './../context/MusicContext';

function QueuePage() {
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  const musicQueue = musicContext.queue;
  const nowPlayingIndex = musicContext.nowPlayingIndex;
  const [list, setList] = useState(musicQueue);

  const handleDelete = (itemId) => {
    const newList = list.filter((item) => item.videoId !== itemId);

    setList(newList);
    updateMusicContext({ queue: newList });
  };

  return (
    <section className="result">
      <h1>Queue</h1>
      <ul>
        {list.map((item, index) => {
          if (index >= nowPlayingIndex) {
            return (
              <li key={`${item.videoId}`}>
                <button
                  style={{ marginRight: '.5rem' }}
                  className="buttons"
                  onClick={() => handleDelete(item.videoId)}
                >
                  Delete
                </button>
                {`${item.name} by ${item.artist.name}`}
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
}

export default QueuePage;
