import React, { useContext } from "react";
import { UserContext } from "./../context/UserContext";
import { MusicContext } from "./../context/MusicContext";

function PlaylistsPage() {
	const [userContext, updateUserContext] = useContext(UserContext);
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	console.log(userContext);

	function playSong(song) {
		updateMusicContext({
			nowPlaying: song
		})
	}
	return (
		<div style={{ padding: "2rem 0" }}>
			<h1>Playlists</h1>
			{userContext.user?.playlists?.length > 0 &&
				userContext.user.playlists.map((playlist) => (
					<div key={playlist._id}>
						<h2>{playlist.title}</h2>
						<ul>
							{playlist.songs.map((song) => (
								<li key={song.videoId} onClick={() => playSong(song)}>{song.name}</li>
							))}
						</ul>
					</div>
				))}
		</div>
	);
}

export default PlaylistsPage;
