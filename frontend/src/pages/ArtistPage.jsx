import React, { useEffect, useState, useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { useParams } from "react-router-dom";
import { getArtistById, getSongsByString } from "../services/musicService";
import ShareLinkBtn from "../components/ShareLinkBtn";
import { MdPlayCircleFilled, MdPlaylistAdd } from "react-icons/md";

const ArtistPage = () => {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [alertMsg, setAlertMsg] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [artist, setArtist] = useState(null);
	const { browseId } = useParams();
	const [artistData, setArtistData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	let timeout;

	useEffect(() => {
		getArtistData(browseId);
	}, []);

	useEffect(() => {
		timeout = setTimeout(() => {
			setShowAlert(false);
			setAlertMsg("");
    }, 2000);
    
    return(() => clearTimeout(timeout))
	}, [showAlert]);

	async function getArtistData(browseId) {
		const data = await getArtistById(browseId);
		setArtistData(data);
		setArtist(data.name);
		setIsLoading(false);
	}

	async function onplayHandler(songName) {
		timeout && clearTimeout(timeout);
		// Make a fetch request to return
		// an array of songs by a search string
		const data = await getSongsByString(songName);

		// Iterate over the array
		for (const song of data.content) {
			// If the artist name of the song is the same
			// as the current artist, update the context
			// and break out of the loop
			if (song.artist.name.toLowerCase() === artist.toLowerCase()) {
				if (
					musicContext.queue[musicContext.nowPlayingIndex]?.videoId ===
					song?.videoId
				) {
					updateMusicContext({
						resetPlayer: true,
					});
					return;
				}
				if (musicContext.queue.length === 0) {
					setAlertMsg("Playing song");
					setShowAlert(true);
					updateMusicContext({
						queue: [...musicContext.queue, song],
						nowPlayingIndex: 0,
					});
				} else {
					const newPlayQueue = [...musicContext.queue];
					newPlayQueue.splice(musicContext.nowPlayingIndex + 1, 0, song);
					setAlertMsg("Playing song");
					setShowAlert(true);
					updateMusicContext({
						queue: newPlayQueue,
						nowPlayingIndex: musicContext.nowPlayingIndex + 1,
					});
				}
				break;
			}
		}
	}

	async function onAddHandler(songName) {
		timeout && clearTimeout(timeout);
		// Make a fetch request to return
		// an array of songs by a search string
		const data = await getSongsByString(songName);

		// Iterate over the array
		for (const song of data.content) {
			// If the artist name of the song is the same
			// as the current artist, update the context
			// and break out of the loop
			if (song.artist.name.toLowerCase() === artist.toLowerCase()) {
				setAlertMsg("Song added to queue");
				setShowAlert(true);
				updateMusicContext({
					queue: [...musicContext.queue, song],
				});
				break;
			}
		}
	}

	return (
		<div className="artist">
			{isLoading ? (
				<h1 className="artist__loading">Loading...</h1>
			) : (
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
						{showAlert && (
							<span className="artist__song-alert">{alertMsg}</span>
						)}
						<h2 className="artist__songs-heading">Top Songs</h2>
						<ul className="artist__list">
							{artistData.products.songs.content.map((song) => (
								<li
									className="artist__song-item"
									key={song.name}
									data-name={song.name}>
									<p className="artist__song-title">{song.name}</p>
									<div className="artist__song-btns">
										<button
											className="artist__play-btn"
											onClick={() => {
												onplayHandler(song.name);
											}}>
											<MdPlayCircleFilled className="artist__play-icon" />
										</button>
										<button
											className="artist__add-btn"
											onClick={() => {
												onAddHandler(song.name);
											}}>
											<MdPlaylistAdd className="artist__add-icon" />
										</button>
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
