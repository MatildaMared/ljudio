import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getArtistById } from "../services/musicService";
import ArtistPageAddToPlaylistBtn from "../components/ArtistPageAddToPlaylistBtn";
import ArtistPageAddToQueueBtn from "../components/ArtistPageAddToQueueBtn";
import ArtistPagePlaySongBtn from "../components/ArtistPagePlaySongBtn";
import ShareLinkBtn from "./../components/ShareLinkBtn";
import { getBtoaString } from "./../utilities/musicUtils.js";

const ArtistPage = () => {
	const [isError, setIsError] = useState(false);
	const [artist, setArtist] = useState(null);
	const { browseId } = useParams();
	const [artistData, setArtistData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {
		getArtistData(browseId);
	}, []);

	async function getArtistData(browseId) {
		const data = await getArtistById(browseId);
		setArtistData(data);
		setArtist(data.name);
		if (data.error) {
			setIsError(true);
		}
		setIsLoading(false);
	}

	function onClickHandler(songName, artistName) {
		const searchString = getBtoaString(songName, artistName);
		history.push(`/song/${searchString}`);
	}

	return (
		<div className="artist">
			{isError && (
				<h1 className="artist__error">
					Could not find artist, please go back and try again...
				</h1>
			)}
			{isLoading && <h1 className="artist__loading">Loading...</h1>}
			{!isLoading && !isError && (
				<div>
					<header className="artist__header">
						<div className="artist__header-wrapper">
							<h1 className="artist__heading">{artistData.name}</h1>
							<ShareLinkBtn className="artist__share-btn" />
						</div>
						{artistData.thumbnails && (
							<img
								src={artistData.thumbnails[0].url}
								alt={artistData.name}
								className="artist__image"
							/>
						)}
					</header>
					<section className="artist__description">
						<h2 className="artist__description-heading">About</h2>
						<p className="artist__description-text">{artistData.description}</p>
					</section>
					<section className="artist__songs">
						<h2 className="artist__songs-heading">Top Songs</h2>
						<ul className="artist__list">
							{artistData.products.songs.content.map((song) => (
								<li
									className="artist__song-item"
									key={song.name}
									data-name={song.name}>
									<p
										className="artist__song-title"
										onClick={() => onClickHandler(song.name, artist)}>
										{song.name}
									</p>
									<div className="artist__song-btns">
										<ArtistPagePlaySongBtn
											songName={song.name}
											artistName={artist}
										/>
										<ArtistPageAddToQueueBtn
											songName={song.name}
											artistName={artist}
										/>
										<ArtistPageAddToPlaylistBtn
											songName={song.name}
											artistName={artist}
										/>
									</div>
								</li>
							))}
						</ul>
					</section>
					<section className="artist__albums">
						<h2 className="artist__albums-heading">Albums</h2>
						<ul className="artist__list">
							{artistData.products.albums &&
								artistData.products.albums.content.map((album) => (
									<li key={album.browseId} className="artist__album-item">
										<div className="artist__album-info">
											<p className="artist__album-year">{album.year}</p>
											<p className="artist__album-title">{`${album.name}`}</p>
										</div>
										<img
											src={album.thumbnails[0].url}
											alt={album.name}
											className="artist__album-thumbnail"></img>
									</li>
								))}
						</ul>
					</section>
				</div>
			)}
		</div>
	);
};

export default ArtistPage;
