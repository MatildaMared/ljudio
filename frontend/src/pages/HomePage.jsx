import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import { getAllMusicByString } from "../services/musicService";
import { getFallbackImage } from "../utilities/musicUtils";
import ThumbnailImages from "../components/ThumbnailImages";

function HomePage() {
	const [userContext, updateUserContext] = useContext(UserContext);
	const playlists = userContext.user.playlists;
	// const [artistData, setArtistData] = useState([]);
	// const [imgData, setImgData] = useState([]);
	// const [isLoading, setIsLoading] = useState(true);
	// const [secondArtistData, setSecondArtistData] = useState(null);
	// const [secondImgData, setSecondImgData] = useState(null);
	// const [thirdArtistData, setThirdArtistData] = useState(null);
	// const [thirdImgData, setThirdImgData] = useState(null);

	// //Get videoId from Local Storage
	// const [searchResult, setSearchResult] = useState(
	// 	localStorage.getItem("searchstring") || ""
	// );

	//Greeting per time of day
	const date = new Date();
	let hours = date.getHours();
	let timeOfDay =
		hours < 12 ? "Morning" : hours <= 18 && hours >= 12 ? "Afternoon" : "Night";

	// //get full data from previous search results
	// async function showSearchResults(searchstring) {
	// 	const data = await getAllMusicByString(searchstring);
	// 	setArtistData(data.content[0].name);
	// 	setImgData(getFirstThumbnail(data));
	// 	setSecondArtistData(data.content[1].name);
	// 	setSecondImgData(getSecondThumbnail(data));
	// 	setThirdArtistData(data.content[2].name);
	// 	setThirdImgData(getThirdThumbnail(data));
	// 	setIsLoading(false);
	// }

	// if (searchResult) {
	// 	showSearchResults(searchResult);
	// }

	// //get first pictur for searchresult
	// function getFirstThumbnail(data) {
	// 	if (data.content[0]?.hasOwnProperty("thumbnails")) {
	// 		if (data.content[0].thumbnails > 0) {
	// 			return data.content[0].thumbnails.url;
	// 		} else {
	// 			return data.content[0].thumbnails[0].url;
	// 		}
	// 	}
	// }

	// //get second picture for searchresult
	// function getSecondThumbnail(data) {
	// 	if (data.content[1]?.hasOwnProperty("thumbnails")) {
	// 		if (data.content[1].thumbnails > 0) {
	// 			return data.content[1].thumbnails.url;
	// 		} else {
	// 			return data.content[1].thumbnails[0].url;
	// 		}
	// 	}
	// }

	// //get third picture for searchresult
	// function getThirdThumbnail(data) {
	// 	if (data.content[2]?.hasOwnProperty("thumbnails")) {
	// 		if (data.content[2].thumbnails > 0) {
	// 			return data.content[2].thumbnails.url;
	// 		} else {
	// 			return data.content[2].thumbnails[0].url;
	// 		}
	// 	}
	// }

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

						{playlists.length === 0 && (
							<p className="home-page__playlists__para">
								You don't have any playlists yet! Why don't you create some?
							</p>
						)}
						{playlists.length > 0 && (
							<section className="home-page__playlists__card">
								{playlists &&
									playlists.map((playlist) => {
										return (
											<div
												key={playlist._id}
												className="home-page__playlists__item-wrapper">
												<div className="home-page__playlists__item">
													<Link to={`/playlist/${playlist._id}`}>
														<ThumbnailImages playlist={playlist} />
														<p className="home-page__playlists__item__title">
															{playlist.title}
														</p>
													</Link>
												</div>
											</div>
										);
									})}
							</section>
						)}
					</article>

					{/* {searchResult && (
						<article className="home-page__previous-search">
							<h2 className="home-page__search__heading">
								Previous search results
							</h2>

							{!isLoading && (
								<section className="home-page__search">
									<ul className="home-page__search__list">
										<li className="home-page__search__list__item">
											<div className="home-page__search__list__item__wrapper">
												<Link to={`/search`}>
													<img
														className="home-page__search__list__item__img"
														onError={getFallbackImage}
														src={imgData}
														alt={artistData}
													/>
													<p className="home-page__search__list__item__para">
														{artistData}
													</p>
												</Link>
											</div>
										</li>

										<li className="home-page__search__list__item">
											<Link to={`/search`}>
												<img
													className="home-page__search__list__item__img"
													onError={getFallbackImage}
													src={secondImgData}
													alt={secondArtistData}
												/>
												<p className="home-page__search__list__item__para">
													{secondArtistData}
												</p>
											</Link>
										</li>

										<li className="home-page__search__list__item">
											<Link to={`/search`}>
												<img
													className="home-page__search__list__item__img"
													src={thirdImgData}
													onError={getFallbackImage}
													alt={thirdArtistData}
												/>
												<p className="home-page__search__list__item__para">
													{thirdArtistData}
												</p>
											</Link>
										</li>
									</ul>
								</section>
							)}
						</article> */}
					{/* )} */}
				</section>
			)}
		</div>
	);
}

export default HomePage;
