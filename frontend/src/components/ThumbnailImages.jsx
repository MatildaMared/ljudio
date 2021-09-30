import React, { useState, useEffect } from "react";
import { getFallbackImage } from "./../utilities/musicUtils";

function ThumbnailImages({ playlist }) {
	const [firstThumbnail, setFirstThumbnail] = useState(null);
	const [secondThumbnail, setSecondThumbnail] = useState(null);
	const [thirdThumbnail, setThirdThumbnail] = useState(null);
	const [fourthThumbnail, setFourthThumbnail] = useState(null);

	useEffect(() => {
		setFirstThumbnail(getFirstThumbnail(playlist.songs));
		setSecondThumbnail(getSecondThumbnail(playlist.songs));
		setThirdThumbnail(getThirdThumbnail(playlist.songs));
		setFourthThumbnail(getFourthThumbnail(playlist.songs));
	}, []);

	function getFirstThumbnail(songs) {
		if (songs[0]?.hasOwnProperty("thumbnails")) {
			if (songs[0].thumbnails.length > 0) {
				return songs[0].thumbnails[0].url;
			} else {
				return songs[0].thumbnails.url;
			}
		}
	}
	function getSecondThumbnail(songs) {
		if (songs[1]?.hasOwnProperty("thumbnails")) {
			if (songs[1].thumbnails.length > 0) {
				return songs[1].thumbnails[0].url;
			} else {
				return songs[1].thumbnails.url;
			}
		}
	}
	function getThirdThumbnail(songs) {
		if (songs[2]?.hasOwnProperty("thumbnails")) {
			if (songs[2].thumbnails.length > 0) {
				return songs[2].thumbnails[0].url;
			} else {
				return songs[2].thumbnails.url;
			}
		}
	}
	function getFourthThumbnail(songs) {
		if (songs[3]?.hasOwnProperty("thumbnails")) {
			if (songs[3].thumbnails.length > 0) {
				return songs[3].thumbnails[0].url;
			} else {
				return songs[3].thumbnails.url;
			}
		}
	}

	return (
		<div className="thumbnail-images">
			{firstThumbnail ? (
				<img
					src={firstThumbnail}
					alt="Album cover image"
					className="thumbnail-images__thumbnail"
					onError={getFallbackImage}
				/>
			) : (
				<div className="thumbnail-images__placeholder"></div>
			)}
			{secondThumbnail ? (
				<img
					src={secondThumbnail}
					alt="Album cover image"
					className="thumbnail-images__thumbnail"
					onError={getFallbackImage}
				/>
			) : (
				<div className="thumbnail-images__placeholder"></div>
			)}
			{thirdThumbnail ? (
				<img
					src={thirdThumbnail}
					alt="Album cover image"
					className="thumbnail-images__thumbnail"
					onError={getFallbackImage}
				/>
			) : (
				<div className="thumbnail-images__placeholder"></div>
			)}
			{fourthThumbnail ? (
				<img
					src={fourthThumbnail}
					alt="Album cover image"
					className="thumbnail-images__thumbnail"
					onError={getFallbackImage}
				/>
			) : (
				<div className="thumbnail-images__placeholder"></div>
			)}
		</div>
	);
}

export default ThumbnailImages;
