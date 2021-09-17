import React, { useEffect, useState, useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import { useParams } from 'react-router-dom';
import { getArtistById, getSongsByString } from '../services/musicService';

const ArtistPage = () => {
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  const [artist, setArtist] = useState(null);
  const { browseId } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    getArtistData(browseId);
  }, []);

  async function getArtistData(browseId) {
    const data = await getArtistById(browseId);
    console.log(data);
    setArtistData(data);
    setArtist(data.name);
    setIsLoading(false);
  }

  async function playSong(songName) {
    // Make a fetch request to return
    // an array of songs by a search string
    const data = await getSongsByString(songName);

    // Iterate over the array
    for (const song of data.content) {
      // If the artist name of the song is the same
      // as the current artist, update the context
      // and break out of the loop
      if (song.artist.name.toLowerCase() === artist.toLowerCase()) {
        updateMusicContext({
          nowPlaying: song,
        });
        break;
      }
    }
  }

  return (
    <div className="artist-info" style={{ padding: '2rem 0rem' }}>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <h1>{artistData.name}</h1>
          {artistData.thumbnails && (
            <img
              src={artistData.thumbnails[0].url}
              alt={artistData.name}
              style={{ marginBottom: '1rem' }}
            />
          )}
          <p
            style={{
              fontSize: '1.2rem',
              marginBottom: '1rem',
              lineHeight: '1.5',
              maxWidth: '45rem',
            }}
          >
            {artistData.description}
          </p>
          <h2>Albums</h2>
          <ul>
            {artistData.products.albums &&
              artistData.products.albums.content.map((album) => (
                <li
                  key={album.browseId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <p>{`${album.name}`}</p>
                  <img
                    src={album.thumbnails[0].url}
                    alt={album.name}
                    style={{ maxWidth: '60px', maxHeight: '60px' }}
                  ></img>
                </li>
              ))}
          </ul>
          <h2>Songs</h2>
          <ul>
            {artistData.products.songs.content.map((song) => (
              <li
                key={song.name}
                data-name={song.name}
                onClick={() => playSong(song.name)}
              >
                {song.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArtistPage;
