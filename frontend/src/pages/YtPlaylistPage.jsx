import React, { useEffect, useState, useContext, useRef } from 'react';
import { MusicContext } from '../context/MusicContext';
import { useParams } from 'react-router-dom';
import { getPlaylistById } from '../services/musicService';
import { getArtistNameFromSongObj } from '../utilities/musicUtils';
import { MdPlayCircleFilled } from 'react-icons/md';
import PlaySongBtn from '../components/PlaySongBtn';
import AddToPlayQueue from '../components/AddToPlayQueue';
import ShareLinkBtn from '../components/ShareLinkBtn';

const YtPlaylistPage = () => {
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  const { browseId } = useParams();
  const [playlistData, setPlaylistData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const playAllBtnRef = useRef();

  useEffect(async () => {
    getPlaylistData(browseId);
  }, []);

  async function getPlaylistData(browseId) {
    const data = await getPlaylistById(browseId);
    console.log(data);
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

  return (
    <div className="yt-playlist">
      {isLoading ? (
        <h3 className="yt-playlist__loading">Loading...</h3>
      ) : (
        <>
          <header className="yt-playlist__header">
            <img
              className="yt-playlist__thumbnail"
              src={playlistData.thumbnails[0].url}
            />
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
            {playlistData.content.map((song, index) => (
              <li key={index} className="yt-playlist__item">
                <div className="yt-playlist__song-info">
                  <p className="yt-playlist__song">{song.name}</p>
                  <p className="yt-playlist__artist">
                    by {getArtistNameFromSongObj(song)}
                  </p>
                </div>
                <div className="yt-playlist__btns">
                  <PlaySongBtn item={song} />
                  <AddToPlayQueue item={song} />
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
