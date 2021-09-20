import React from 'react';
import PlaySongBtn from './PlaySongBtn';
import AddToPlayQueue from './AddToPlayQueue';

function ResultsSongs({ songs }) {
  return (
    <div>
      <div className="results">
        <h2 className="all-results__heading">Songs</h2>
        <ul className="results__list">
          {songs &&
            songs.map((item) => (
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

export default ResultsSongs;
