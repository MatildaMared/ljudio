const { Router } = require("express");
const playlistController = require("../controllers/playlistController");
const router = new Router();

// Create new playlist
router.post("/", playlistController.createPlaylist);

// Get playlist by ID
router.get("/:id", playlistController.getPlaylist);

// Add song to playlist
router.post("/:id");

module.exports = router;
