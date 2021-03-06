import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';
import { useParams } from 'react-router-dom';
import { getPlaylistById } from '../services/musicService';
import {
  getArtistNameFromSongObj,
  getBtoaString,
} from '../utilities/musicUtils';
import { MdPlayCircleFilled } from 'react-icons/md';
import PlaySongBtn from '../components/PlaySongBtn';
import AddToPlayQueue from '../components/AddToPlayQueue';
import ShareLinkBtn from '../components/ShareLinkBtn';
import AddToPlaylist from '../components/AddToPlaylist';
import YtThumbnailImages from '../components/YtThumbnailImages';

const YtPlaylistPage = () => {
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  const { browseId } = useParams();
  const [playlistData, setPlaylistData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const playAllBtnRef = useRef();
  const history = useHistory();

  useEffect(async () => {
    getPlaylistData(browseId);
  }, []);

  useEffect(async () => {}, [playlistData]);

  async function getPlaylistData(browseId) {
    const data = await getPlaylistById(browseId);
    setPlaylistData(data);
    setIsLoading(false);
  }

  function playEntireList(songsArr) {
    updateMusicContext({
      queue: songsArr,
      nowPlayingIndex: 0,
      resetPlayer: true,
    });
    playAllBtnRef.current.blur();
  }

  function getPlaylistThumbnailUrl(playlist) {
    if (playlist?.hasOwnProperty('thumbnails')) {
      if (playlist.thumbnails.length > 0) {
        return playlist.thumbnails[0].url;
      } else {
        return playlist.thumbnails.url;
      }
    }
  }

  function onClickHandler(songName, artistName) {
    const searchString = getBtoaString(songName, artistName);
    history.push(`/song/${searchString}`);
  }

  return (
    <div className="yt-playlist">
      {isLoading ? (
        <h3 className="yt-playlist__loading">Loading...</h3>
      ) : (
        <>
          <header className="yt-playlist__header">
            {/* <img
							className="yt-playlist__thumbnail"
							src={getPlaylistThumbnailUrl(playlistData)}
						/> */}
            <YtThumbnailImages playlist={playlistData} />
            <div className="yt-playlist__info">
              <h1 className="yt-playlist__heading">{playlistData.title}</h1>
              <p className="yt-playlist__owner">by {playlistData.owner}</p>
            </div>
          </header>
          <button
            className="btn yt-playlist__btn"
            ref={playAllBtnRef}
            onClick={() => {
              playEntireList(playlistData.content);
            }}
          >
            <span>Play entire list</span>
            <MdPlayCircleFilled className="yt-playlist__icon" />
          </button>
          <ShareLinkBtn className="yt-playlist__share-btn" />
          <ul className="yt-playlist__list">
            <h2 className="yt-playlist__heading--secondary">Songs</h2>
            {playlistData.content.map((song, index) => (
              <li key={index} className="yt-playlist__item">
                <div className="yt-playlist__song-info">
                  <p
                    className="yt-playlist__song"
                    onClick={() =>
                      onClickHandler(getArtistNameFromSongObj(song), song.name)
                    }
                  >
                    {song.name}
                  </p>
                  <p className="yt-playlist__artist">
                    by {getArtistNameFromSongObj(song)}
                  </p>
                </div>
                <div className="yt-playlist__btns">
                  <PlaySongBtn item={song} />
                  <AddToPlayQueue item={song} />
                  <AddToPlaylist item={song} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default YtPlaylistPage;
