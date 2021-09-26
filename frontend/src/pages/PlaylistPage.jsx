import React, { useEffect, useState, useContext, useRef } from 'react';
import { MusicContext } from '../context/MusicContext';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { getPlaylist } from './../services/playlistService';
import { MdDeleteForever, MdPlayCircleFilled } from 'react-icons/md';
import { removeSongFromPlaylist } from './../services/playlistService';
import PlaySongBtn from '../components/PlaySongBtn';

const PlaylistPage = () => {
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  const [userContext, updateUserContext] = useContext(UserContext);
  const { playlistId } = useParams();
  const [playlistData, setPlaylistData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const playAllBtnRef = useRef();

  // on page load, get the playlist data
  // from the database
  useEffect(async () => {
    getPlaylistData(playlistId);
  }, []);

  // If the userId of the playlist is the same
  // as the id of the logged in user,
  // set isOwner to true so that we can display
  // functionality only meant for the owner,
  // like deleting a playlist
  useEffect(() => {
    if (userContext.user.id === playlistData?.userId) {
      setIsOwner(true);
    }
  }, [userContext, playlistData]);

  // Make a request to the database
  // to get the playlist, then update
  // playlistData variable with the playlist data
  // and set isLoading variable to false to be
  // able to display the data
  async function getPlaylistData(playlistId) {
    const data = await getPlaylist(playlistId);
    setPlaylistData(data.playlist);
    setIsLoading(false);
  }

  async function removeSongHandler(videoId) {
    const playlistId = playlistData._id;
    const data = await removeSongFromPlaylist(playlistId, videoId);
    console.log(data);
    setPlaylistData(data.updatedPlaylist);
    updateUserContext({
      user: data.user,
    });
  }

  function playEntirePlaylist(songArr) {
    console.log(songArr);
    updateMusicContext({
      queue: songArr,
      nowPlayingIndex: 0,
      resetPlayer: true,
    });
    playAllBtnRef.current.blur();
  }

  return (
    <div className="playlist">
      {isLoading && <h3 className="playlist__loading">Loading...</h3>}
      {isOwner && (
        <h2 className="playlist__header">
          You are the owner of this playlist!
        </h2>
      )}
      {playlistData && (
        <section className="playlist__wrapper">
          <h1 className="playlist__wrapper__heading">
            <span>{playlistData.title}</span>
            <button
              className="playlist__wrapper__heading__btn"
              ref={playAllBtnRef}
              onClick={() => {
                playEntirePlaylist(playlistData.songs);
              }}
            >
              <span>Play entire list </span>

              <MdPlayCircleFilled className="playlist__wrapper__heading__icon" />
            </button>
          </h1>

          <ul className="playlist__wrapper__description">
            {playlistData.songs &&
              playlistData.songs.map((song) => (
                <li
                  className="playlist__wrapper__description__li"
                  key={song.videoId}
                >
                  <div className="playlist__wrapper__description__li__content">
                    {song.thumbnails && (
                      <img
                        src={song.thumbnails[0].url}
                        alt={song.name}
                        className="playlist__wrapper__description__img"
                      />
                    )}

                    <div className="playlist__wrapper__description__song">
                      <h3 className="playlist__wrapper__description__title">
                        {song.name}
                      </h3>
                      <h4 className="playlist__wrapper__description__artist">
                        {song.artist.name}
                      </h4>
                    </div>
                  </div>
                  <div className="playlist__btn">
                    <PlaySongBtn item={song} />
                    {isOwner && (
                      <button className="playlist__btn--delete">
                        <MdDeleteForever
                          onClick={() => removeSongHandler(song.videoId)}
                        />
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default PlaylistPage;
