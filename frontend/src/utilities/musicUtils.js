export function playSong(item) {
	console.log(item);
	if (musicContext.queue.length === 0) {
		console.log("musicContext queue is empty!");
		updateMusicContext({
			queue: [...musicContext.queue, item],
			nowPlayingIndex: 0,
		});
	} else {
		const newPlayQueue = [...musicContext.queue];
		newPlayQueue.splice(musicContext.nowPlayingIndex + 1, 0, item);
		updateMusicContext({
			queue: newPlayQueue,
			nowPlayingIndex: musicContext.nowPlayingIndex + 1,
		});
	}
}