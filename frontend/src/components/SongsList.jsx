import React from "react";
import PlaySongBtn from "./PlaySongBtn";
import AddToPlayQueue from "./AddToPlayQueue";
import AddToPlaylist from "./AddToPlaylist";

function SongsList({ songs }) {
	return (
		<section className="songslist">
			<h2 className="songslist__heading">Songs</h2>
			<ul className="songslist__list">
				{songs &&
					songs.map((item) => (
						<li className="songslist__item" key={item.videoId}>
							<div className="songslist__info">
								<p className="songslist__song-name">{item.name}</p>
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
