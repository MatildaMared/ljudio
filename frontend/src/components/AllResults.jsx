import React, { useContext } from 'react';
import { MusicContext } from './../context/MusicContext';
import ArtistsList from './ArtistsList';
import SongsList from './SongsList';

function AllResults() {
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  let songsArray = [];
  let artistsArray = [];
  let playlistsArray = [];

  // Takes in a single array of items and
  // sorts items into on of three arrays
  // based on type (album, song, artist)
  function sortResults(array) {
    array.forEach((item) => {
      if (item.type === 'song') {
        songsArray.push(item);
      } else if (item.type === 'artist') {
        artistsArray.push(item);
      } else if (item.type === 'playlist') {
        playlistsArray.push(item);
      }
    });
  }

  sortResults(musicContext.fetchResult.content);

  return (
    <div className="all-results">
      <ArtistsList artists={artistsArray} />
      <SongsList songs={songsArray} />
    </div>
  );
}

export default AllResults;
