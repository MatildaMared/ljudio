import React, { useContext, useState } from "react";
import { MusicContext } from "./../context/MusicContext";
import { useHistory } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { MdPlayCircleFilled, MdPlaylistAdd } from "react-icons/md";

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
      if (item.type === "song") {
        songsArray.push(item);
      } else if (item.type === "artist") {
        artistsArray.push(item);
      } else if (item.type === "album") {
        albumsArray.push(item);
      }
    });
  }

  sortResults(musicContext.fetchResult.content);

  function playSong(item) {
    if (musicContext.queue.length === 0) {
      updateMusicContext({
        queue: [...musicContext.queue, item],
        nowPlayingIndex: 0,
      });
    } else {
      const newPlayQueue = [...musicContext.queue];
      newPlayQueue.splice(musicContext.nowPlayingIndex + 1, 0, item);
      updateMusicContext({
        queue: newPlayQueue,
        nowPlayingIndex: musicContext.nowPlayingIndex + 1,
      });
    }
  }

  function addToQueue(item) {
    updateMusicContext({
      queue: [...musicContext.queue, item],
    });
  }

  return (
    <div className="all-results">
      <h2 className="all-results__heading">Artists</h2>
      <div className="results">
        <ul className="results__list">
          {artistsArray &&
            artistsArray.map((item) => (
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
                <p style={{ marginBottom: ".5rem" }}>
                  {item.name} by {item.artist.name}
                </p>
                <div className="results__icon-wrapper">
                  <MdPlayCircleFilled
                    className="results__list__icon"
                    onClick={() => playSong(item)}
                  />
                  <MdPlaylistAdd
                    className="results__list__icon"
                    onClick={() => {
                      addToQueue(item);
                    }}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default AllResults;
