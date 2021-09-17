import React from 'react';
import { useHistory } from 'react-router-dom';

function AllResultsArtists({ artists }) {
  const history = useHistory();

  return (
    <div className="results">
      <h2 className="all-results__heading">Artists</h2>
      <ul className="results__list">
        {artists &&
          artists.map((item) => (
            <li
              className="results__list__item cursor"
              key={item.browseId}
              onClick={() => history.push(`/artist/${item.browseId}`)}
            >
              <p>{`${item.name}`}</p>
              <img src={item.thumbnails[0].url} alt={item.name}></img>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AllResultsArtists;
