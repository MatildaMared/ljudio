import React from "react";
import { useHistory } from "react-router-dom";
import PlaySongBtn from "./PlaySongBtn";
import AddToPlayQueue from "./AddToPlayQueue";
import AddToPlaylist from "./AddToPlaylist";
import { getBtoaString } from "../utilities/musicUtils";

function SongsList({ songs }) {
	const history = useHistory();

	function onClickHandler(songName, artistName) {
		const searchString = getBtoaString(songName, artistName);
		history.push(`/song/${searchString}`);
	}

	return (
		<section className="songslist">
			<h2 className="songslist__heading">Songs</h2>
			<ul className="songslist__list">
				{songs &&
					songs.map((item) => (
						<li className="songslist__item" key={item.videoId}>
							<div className="songslist__info">
								<p
									className="songslist__song-name"
									onClick={() => onClickHandler(item.name, item.artist.name)}>
									{item.name}
								</p>
								<p className="songslist__artist-name">{item.artist.name}</p>
							</div>
							<div className="songslist__icons">
								<PlaySongBtn item={item} />
								<AddToPlayQueue item={item} />
								<AddToPlaylist item={item} />
							</div>
						</li>
					))}
			</ul>
		</section>
	);
}

export default SongsList;
