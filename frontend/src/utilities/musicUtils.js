export function getArtistNameFromSongObj(item) {
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
	return undefined;
}
