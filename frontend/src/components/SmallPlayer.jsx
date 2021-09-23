import React, { useEffect, useState } from "react";
import PlayPauseBtn from "./PlayPauseBtn";

function SmallPlayer({ song, artist, title, isPlaying, play, pause }) {
	const [thumbnailUrl, setThumbnailUrl] = useState(null);

	useEffect(() => {
		if (song?.hasOwnProperty("thumbnails")) {
			if (song.thumbnails.length > 0) {
				setThumbnailUrl(song.thumbnails[0].url);
			} else {
				setThumbnailUrl(song.thumbnails.url);
			}
		}
	}, [song]);

	return (
		<section className="small-player">
			<div className="small-player__wrapper">
				{thumbnailUrl && (
					<img
						src={thumbnailUrl}
						className="small-player__thumbnail"
						alt="Album cover"></img>
				)}
				<div className="small-player__info">
					<p className="small-player__artist">{artist}</p>
					<p className="small-player__title">{title}</p>
				</div>
				<PlayPauseBtn isPlaying={isPlaying} play={play} pause={pause} />
			</div>
		</section>
	);
}

export default SmallPlayer;
