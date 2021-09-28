const { Router } = require("express");
const playlistController = require("../controllers/playlistController");
const router = new Router();

// Create new playlist
router.post("/", playlistController.createPlaylist);

// Get playlist by ID
router.get("/:id", playlistController.getPlaylist);

// Add song to playlist
router.post("/:playlistId", playlistController.addSongToPlaylist);

// Remove playlist
router.delete("/:id", playlistController.removePlaylist);

// Remove song from playlist
router.delete(
	"/:playlistId/:videoId",
	playlistController.removeSongFromPlaylist
);

// Change the title of a playlist
router.post("/:playlistId/changetitle", playlistController.changeTitle);

// Follow another user playlist
router.get("/follow/:playlistId", playlistController.followPlaylist);

// Unfollow another user playlist
router.delete("/unfollow/:playlistId", playlistController.unfollowPlaylist);

module.exports = router;
