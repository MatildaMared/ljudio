import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import PlaySongBtn from "../components/PlaySongBtn";
import { getAllMusicByString } from "../services/musicService";
import { getPlaylistThumnails } from "../utilities/musicUtils";

function HomePage() {
  const [userContext, updateUserContext] = useContext(UserContext);
  const playlists = userContext.user.playlists;
  const [artistData, setArtistData] = useState([]);
  const [imgData, setImgData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [secondArtistData, setSecondArtistData] = useState(null);
  const [secondImgData, setSecondImgData] = useState(null);
	const [thirdArtistData, setThirdArtistData] = useState(null);
  const [thirdImgData, setThirdImgData] = useState(null);

  //Get videoId from Local Storage
  const [firstSearchResult, setFirstSearchResult] = useState(
    localStorage.getItem("searchstring") || ""
  );

  //Greeting per time of day
  const date = new Date();
  let hours = date.getHours();
  let timeOfDay =
    hours < 12 ? "Morning" : hours <= 18 && hours >= 12 ? "Afternoon" : "Night";

		//get first pictur for searchresult
		function getFirstThumbnail(data) {
			if (data.content[0]?.hasOwnProperty("thumbnails")) {
				if (data.content[0].thumbnails > 0) {
					return data.content[0].thumbnails.url;
				} else {
					return data.content[0].thumbnails[0].url
				}
			}
		}

		//get second picture for searchresult
		function getSecondThumbnail(data) {
			if (data.content[1]?.hasOwnProperty("thumbnails")) {
				if (data.content[1].thumbnails > 0) {
					return data.content[1].thumbnails.url;
				} else {
					return data.content[1].thumbnails[0].url
				}
			}
		}

		//get third picture for searchresult
		function getThirdThumbnail(data) {
			if (data.content[2]?.hasOwnProperty("thumbnails")) {
				if (data.content[2].thumbnails > 0) {
					return data.content[2].thumbnails.url;
				} else {
					return data.content[2].thumbnails[0].url
				}
			}
		}

  //get full data from previous search results
  async function showSearchResults(searchstring) {
    const data = await getAllMusicByString(searchstring);
    setArtistData(data.content[0].name);
    setImgData(getFirstThumbnail(data));
		setSecondArtistData(data.content[1].name);
		setSecondImgData(getSecondThumbnail(data));
		setThirdArtistData(data.content[2].name);
		setThirdImgData(getThirdThumbnail(data))
  	setIsLoading(false);
  }

  showSearchResults(firstSearchResult);

  return (
    <div className="home-page">
      {userContext.user?.firstName && (
        <section className="home-page__header">
          <article className="home-page__header-wrapper">
            <h1 className="home-page__heading">
              Good {timeOfDay}, {userContext.user?.firstName}! 👋
            </h1>
            <p className="home-page__heading__para">
              What music are you in the mood for today? 🥳
            </p>
          </article>

          <article className="home-page__playlists">
            <h2 className="home-page__playlists__heading">Your playlists</h2>
            <section className="home-page__playlists__card">
              {playlists &&
                playlists.map((playlist) => {
                  return (
                    <div
                      className="home-page__playlists__item"
                      key={playlist._id}
                    >
                      <Link to={`/playlist/${playlist._id}`}>
                        <div className="home-page__playlists__item__img-container">
                          {playlist.songs[0] && (
                            <img
                              className="home-page__playlists__item__img-container__img"
                              src={getPlaylistThumnails(playlist.songs[0])}
                              alt={playlist.title}
                            />
                          )}
                          {playlist.songs[1] && (
                            <img
                              className="home-page__playlists__item__img-container__img"
                              src={getPlaylistThumnails(playlist.songs[1])}
                              alt={playlist.title}
                            />
                          )}
                          {playlist.songs[2] && (
                            <img
                              className="home-page__playlists__item__img-container__img"
                              src={getPlaylistThumnails(playlist.songs[2])}
                              alt={playlist.title}
                            />
                          )}
                          {playlist.songs[3] && (
                            <img
                              className="home-page__playlists__item__img-container__img"
                              src={getPlaylistThumnails(playlist.songs[3])}
                              alt={playlist.title}
                            />
                          )}
                        </div>

                        <p className="home-page__playlists__item__title">
                          {playlist.title}
                        </p>
                        <p className="home-page__playlists__item__playlist">
                          Playlist
                        </p>
                        {/* <PlaySongBtn /> */}
                      </Link>
                    </div>
                  );
                })}
            </section>

            <h2 className="home-page__search__heading">
              Previos search results
            </h2>

            {!isLoading && (
              <section className="home-page__search">	
                <ul className="home-page__search__list">
									<Link to={`/search`}>
                  <li className="home-page__search__list__item">
                    <img
                      className="home-page__search__list__item__img"
                      src={imgData}
                      alt={artistData}
                    />
										<p className="home-page__search__list__item__para">{artistData}</p>                    
                  </li>
									</Link>
									<Link to={`/search`}>
                  <li className="home-page__search__list__item">
									<img
                      className="home-page__search__list__item__img"
                      src={secondImgData}
                      alt={secondArtistData}
                    />
										<p className="home-page__search__list__item__para">{secondArtistData}</p>
									</li>
									</Link>
									<Link to={`/search`}>
									<li className="home-page__search__list__item">
									<img
                      className="home-page__search__list__item__img"
                      src={thirdImgData}
                      alt={thirdArtistData}
                    />
										<p className="home-page__search__list__item__para">{thirdArtistData}</p>      
									</li>
									</Link>
                </ul>
              </section>
            )}
          </article>
        </section>
      )}
    </div>
  );
}

export default HomePage;
