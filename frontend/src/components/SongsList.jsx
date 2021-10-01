import React, {useContext, useState} from 'react';
import { MusicContext } from '../context/MusicContext';
import { useHistory } from 'react-router-dom';
import PlaySongBtn from './PlaySongBtn';
import AddToPlayQueue from './AddToPlayQueue';
import AddToPlaylist from './AddToPlaylist';
import { getBtoaString } from '../utilities/musicUtils';
import { getSongsByString } from '../services/musicService';

function SongsList({ songs }) {
  const history = useHistory();
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  const [showMoreResults, setShowMoreResults] = useState(false);
  const [moreResults, setMoreResults] = useState([]);

  async function handleClick() {
    const string = `${musicContext.searchString}?next=${musicContext.fetchResult.next}`;
    const data = await getSongsByString(string);
    setMoreResults(data.content);
    setShowMoreResults(true);
    updateMusicContext({
      fetchResult: data,
    });
    window.scrollTo(0, 0);
  }

  function onClickHandler(songName, artistName) {
    const searchString = getBtoaString(songName, artistName);
    history.push(`/song/${searchString}`);
  }

  return (
    <section className="songslist">
      <h2 className="songslist__heading">Songs</h2>
      {!showMoreResults && (
        <ul className="songslist__list">
          {songs &&
            songs.map((item) => (
              <li className="songslist__item" key={item.videoId}>
                <div className="songslist__info">
                  <p
                    className="songslist__song-name"
                    onClick={() => onClickHandler(item.name, item.artist.name)}
                  >
                    {item.name}
                  </p>
                  <p className="songslist__artist-name">{item.artist.name}</p>
                </div>
                <div className="songslist__icons">
                  <PlaySongBtn item={item} />
                  <AddToPlayQueue item={item} />
                  <AddToPlaylist item={item} />
                </div>
              </li>
            ))}
        </ul>
      )}
      {showMoreResults && (
        <ul className="songslist__list">
          {moreResults &&
            moreResults.map((item) => (
              <li className="songslist__item" key={item.videoId}>
                <div className="songslist__info">
                  <p
                    className="songslist__song-name"
                    onClick={() => onClickHandler(item.name, item.artist.name)}
                  >
                    {item.name}
                  </p>
                  <p className="songslist__artist-name">{item.artist.name}</p>
                </div>
                <div className="songslist__icons">
                  <PlaySongBtn item={item} />
                  <AddToPlayQueue item={item} />
                  <AddToPlaylist item={item} />
                </div>
              </li>
            ))}
        </ul>
      )}
      <article className="songslist__footer">
        {musicContext.fetchResult.next && (
          <button className="songslist__btn" onClick={() => handleClick()}>
            More results
          </button>
        )}
      </article>
    </section>
  );
}

export default SongsList;
