import React, { useContext } from 'react';
import { MusicContext } from './../context/MusicContext';
import { useHistory } from 'react-router-dom';
import { MdPlayCircleFilled } from 'react-icons/md';
import PlaySongBtn from './PlaySongBtn';
import AddToPlayQueue from './AddToPlayQueue';

function AllResults() {
  const history = useHistory();
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
      <h2 className="all-results__heading">Artists</h2>
      <div className="results">
        <ul className="results__list">
          {artistsArray &&
            artistsArray.map((item) => (
              <li
                className="results__list__item"
                key={item.browseId}
                onClick={() => history.push(`/artist/${item.browseId}`)}
              >
                <p>{`${item.name}`}</p>
                <img src={item.thumbnails[0].url} alt={item.name}></img>
              </li>
            ))}
        </ul>
        {/* <h2>Albums</h2>
			<ul>
				{albumsArray &&
					albumsArray.map((item) => (
						<li
							key={item.browseId}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<p>{`${item.name}`}</p>
							<img src={item.thumbnails[0].url} alt={item.name}></img>
						</li>
					))}
			</ul> */}
        <h2 className="all-results__heading">Songs</h2>
        <ul className="results__list">
          {songsArray &&
            songsArray.map((item) => (
              <li className="results__list__item" key={item.videoId}>
                <p style={{ marginBottom: '.5rem' }}>
                  {item.name} by {item.artist.name}
                </p>
                <div className="results__icon-wrapper">
                  <PlaySongBtn item={item} />
                  <AddToPlayQueue item={item} />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default AllResults;
