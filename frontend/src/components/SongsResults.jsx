import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import PlaySongBtn from './PlaySongBtn';
import AddToPlayQueue from '../components/AddToPlayQueue';
import AddToPlaylist from './AddToPlaylist';

function SongsResults() {
  const [musicContext, updateMusicContext] = useContext(MusicContext);

  return (
    <section className="result">
      <h1>Songs</h1>
      <ul>
        {musicContext.fetchResult.content.map((item) => (
          <li key={item.videoId} className="item__wrapper">
            {`${item.name} by ${item.artist.name}`}
            <div className="item__wrapper--btn">
              <PlaySongBtn item={item} />
              <AddToPlayQueue item={item} />
              <AddToPlaylist item={item} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SongsResults;
