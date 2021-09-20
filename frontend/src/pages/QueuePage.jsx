import React, { useContext } from "react";
import { MusicContext } from "./../context/MusicContext";
import { MdDeleteForever } from "react-icons/md";
import { getArtistNameFromSongObj } from "./../utilities/musicUtils";

function QueuePage() {
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  const musicQueue = musicContext.queue;
  const nowPlayingIndex = musicContext.nowPlayingIndex;

  async function handleDelete (itemId) { 
    const newPlayQueue = [...musicQueue];
    
    newPlayQueue.splice(itemId, 1);

    await updateMusicContext({
        queue: newPlayQueue,
      });
  };

  return (
    <section className="queue-page">
      <h1 className="queue-page__header">Queue</h1>
      <ul className="queue-page__list">
        {musicQueue && musicQueue.map((item, index) => {
          if (index >= nowPlayingIndex) {
            return (
              <li key={index} className="queue-page__list__item">
                {`${item.name} by ${getArtistNameFromSongObj(item)}`}
                <MdDeleteForever
                  className="queue-page__list__btn"
                  onClick={() => handleDelete(index)}
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