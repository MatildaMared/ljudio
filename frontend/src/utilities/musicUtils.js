export function getArtistNameFromSongObj(item) {
	if (item?.artist?.length === 0) {
		return "";
	}
	if (item?.artist?.name) {
		return item.artist?.name;
	}
	if (item?.author) {
		return item.author.name;
	}
	if (item?.artist[0]?.name) {
		return item.artist[0]?.name;
	}
	if (item?.author[0]) {
		return item.author[0]?.name;
	}
}

export function getBtoaString(artistName, songName) {
	let btoaString = `${artistName} ${songName}`;
	btoaString = btoaString.replace(/([()])/g, "");
	btoaString = btoaString.replaceAll("undefined", "");
	btoaString = btoaString.replaceAll(`"`, "");
	btoaString = btoaString.replaceAll("Soundtrack", "");
	btoaString = btoaString.replaceAll("Version", "");
	btoaString = btoaString.replaceAll("Official Video", "");
	btoaString = btoaString.replaceAll("Sing-Along", "");
	return window.btoa(unescape(encodeURIComponent(btoaString)));
}

export function decodeBtoaString(string) {
	return decodeURIComponent(escape(window.atob(string)));
}

export function getThumbNailUrlFromSongObj(song) {
	if (song?.hasOwnProperty("thumbnails")) {
		if (song.thumbnails.length > 0) {
			return song.thumbnails[0].url;
		} else {
			return song.thumbnails.url;
		}
	}
}

//get pictures for playlists
export function getPlaylistThumnails(playlist) {
if (playlist?.hasOwnProperty("thumbnails")) {
	if (playlist.thumbnails.length > 0) {
	return playlist.thumbnails[0].url;
	} else {
	return playlist.thumbnails.url;
	}
}
}