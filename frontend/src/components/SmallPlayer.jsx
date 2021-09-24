import React, { useEffect, useState, useContext, useRef } from "react";
import PlayPauseBtn from "./PlayPauseBtn";
import { LayoutContext } from "../context/LayoutContext";

function SmallPlayer({ song, artist, title, isPlaying, play, pause }) {
	const [layoutContext, updateLayoutContext] = useContext(LayoutContext);
	const [thumbnailUrl, setThumbnailUrl] = useState(null);
	const btnRef = React.createRef();

	useEffect(() => {
		if (song?.hasOwnProperty("thumbnails")) {
			if (song.thumbnails.length > 0) {
				setThumbnailUrl(song.thumbnails[0].url);
			} else {
				setThumbnailUrl(song.thumbnails.url);
			}
		}
	}, [song]);

	function togglePlayerHandler(e) {
		e.stopPropagation();
		if (
			e.target === btnRef.current ||
			e.target.parentElement === btnRef.current ||
			e.target.parentElement.parentElement === btnRef.current
		) {
			return;
		}
		updateLayoutContext({
			showPlayerOnSmallDevice: !layoutContext.showPlayerOnSmallDevice,
		});
	}

	return (
		<section
			onClick={togglePlayerHandler}
			className={
				layoutContext.showPlayerOnSmallDevice
					? "small-player small-player--hide"
					: "small-player"
			}>
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
				<PlayPauseBtn
					ref={btnRef}
					isPlaying={isPlaying}
					play={play}
					pause={pause}
				/>
			</div>
		</section>
	);
}

export default SmallPlayer;
