import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import SongsList from './SongsList';

function SongsResults() {
  const [musicContext, updateMusicContext] = useContext(MusicContext);

  return (
    <section className="songs-results">
      <SongsList songs={musicContext.fetchResult.content} />
    </section>
  );
}

export default SongsResults;
