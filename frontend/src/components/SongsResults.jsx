import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import PlaySongBtn from './PlaySongBtn';
import AddToPlayQueue from '../components/AddToPlayQueue';

function SongsResults() {
  const [musicContext, updateMusicContext] = useContext(MusicContext);

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
