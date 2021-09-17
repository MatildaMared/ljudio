import React, { useContext } from 'react';
import { MusicContext } from './../context/MusicContext';
import AllResultsArtists from './AllResultsArtists';
import ResultsSongs from './ResultsSongs';

function AllResults() {
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  let songsArray = [];
  let artistsArray = [];
  let albumsArray = [];

  // Takes in a single array of items and
  // sorts items into on of three arrays
  // based on type (album, song, artist)
  function sortResults(array) {
    array.forEach((item) => {
      if (item.type === 'song') {
        songsArray.push(item);
      } else if (item.type === 'artist') {
        artistsArray.push(item);
      } else if (item.type === 'album') {
        albumsArray.push(item);
      }
    });
  }

  sortResults(musicContext.fetchResult.content);

  return (
    <div className="all-results">
      <AllResultsArtists artists={artistsArray} />
      <ResultsSongs songs={songsArray} />
    </div>
  );
}

export default AllResults;
