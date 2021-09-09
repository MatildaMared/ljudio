const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utilites/errorResponse");
const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// Get single playlist from DB based on URL parameter
function getPlaylist(req, res, next) {
	const playlistId = req.params.id;
	Playlist.findById(playlistId, (err, playlist) => {
		if (err) {
			return next(
				new ErrorResponse("Could not find a playlist with that ID...", 400)
			);
		}
		res.status(200).json({
			success: true,
			playlist,
		});
	});
}

// Creates a new playlist,
// requires the user to be signed in
async function createPlaylist(req, res, next) {
	try {
		const { title } = req.body;

		// grabs the JWT token from the http request headers
		const token = req.headers.authorization.split(" ")[1];

		let userId = null;

		// tries to decode the JWT token
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			// If there was an error trying to decode the JWT,
			// return an error response to the user
			if (err) {
				return next(new ErrorResponse("Invalid token", 400));
			}

			// If there was no error, set userId equal to
			// the id from the decoded JWT
			userId = decoded.id;
		});

		// Finds user in database based on id in decoded JWT token
		const user = await User.findById(userId);

		// Creates new empty playlist with the title
		// provided by the user
		const playlist = await Playlist.create({
			_id: new mongoose.Types.ObjectId(),
			userId: user._id,
			title,
		});

		// Push the playlist ID into the user playlists array
		user.playlists.push(playlist._id);

		// Save changes in user to database
		await user.save();

		// Send back the created playlist
		// and user in the response
		res.status(200).json({
			success: true,
			playlist,
			user,
		});
	} catch (err) {
		next(
			new ErrorResponse("Could not create playlist, please try again...", 400)
		);
	}
}

module.exports = { createPlaylist, getPlaylist };
