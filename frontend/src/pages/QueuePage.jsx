import React, { useContext, useState } from 'react';
import { MusicContext } from './../context/MusicContext';
import { MdDeleteForever } from 'react-icons/md';

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

  function getArtistName(item) {
    if (item.artist?.name) {
      return item.artist?.name;
    } else if (item.author[0]) {
      return item.author[0]?.name
    } else if (item.author) {
      return item.author.name
    }
  }

  return (
    <section className="queue-page">
      <h1 className="queue-page__header">Queue</h1>
      <ul className="queue-page__list">
        {list.map((item, index) => {
          if (index >= nowPlayingIndex) {
            return (
              <li key={`${item.videoId}`} className="queue-page__list__item">
                {`${item.name} by ${getArtistName(item)}`}
                <MdDeleteForever
                  className="queue-page__list__btn"
                  onClick={() => handleDelete(item.videoId)}
                />
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
}

export default QueuePage;
