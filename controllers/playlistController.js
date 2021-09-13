const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utilites/errorResponse");
const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

async function getUserIdFromToken(token) {
	let userId = null;
	// tries to decode the JWT token
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		// If there was an error trying to decode the JWT,
		// return an error response
		if (err) {
			return null;
		}

		userId = decoded.id;
	});
	// If there was no error, return
	// the id from the decoded JWT
	return userId;
}

// Get single playlist from DB based on URL parameter
function getPlaylist(req, res, next) {
	try {
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
	} catch (err) {
		next(err);
	}
}

// Creates a new playlist,
// requires the user to be signed in
async function createPlaylist(req, res, next) {
	try {
		const { title } = req.body;

		// grabs the JWT token from the http request headers
		const token = req.headers.authorization.split(" ")[1];

		// gets userId based on decoded jwt
		const userId = await getUserIdFromToken(token);

		// Return error if jwt token could not be decoded
		if (userId === null) {
			return next(new ErrorResponse("Unauthorized", 400));
		}

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
		next(err);
	}
}

async function addSongToPlaylist(req, res, next) {
	try {
		const playlistId = req.params.id;
		const { song } = req.body;

		// grabs the JWT token from the http request headers
		const token = req.headers.authorization.split(" ")[1];

		// gets userId based on decoded jwt
		const userId = await getUserIdFromToken(token);

		// Return error if jwt token could not be decoded
		if (userId === null) {
			return next(new ErrorResponse("Unauthorized", 400));
		}

		// Finds user in database
		const user = await User.findById(userId);

		// Return error if user was not found
		if (!user) {
			return next(
				new ErrorResponse(
					"Could not find user in database, please try again...",
					400
				)
			);
		}

		// Finds playlist in database
		const playlist = await Playlist.findById(playlistId);

		// Return error if playlist was not found
		if (!playlist) {
			return next(
				new ErrorResponse(
					"Could not find playlist in database, please try again...",
					400
				)
			);
		}

		// Push song into playlist songs array
		playlist.songs.push(song);

		// Save changes to database
		await playlist.save();

		res.status(200).json({
			success: true,
			playlist,
		});
	} catch (err) {
		next(err);
	}
}

async function removePlaylist(req, res, next) {
	try {
		playlistId = req.params.id;
		console.log("Playlist id is: ", playlistId);

		// grabs the JWT token from the http request headers
		const token = req.headers.authorization.split(" ")[1];

		// gets userId based on decoded jwt
		const userId = await getUserIdFromToken(token);

		// Return error if jwt token could not be decoded
		if (userId === null) {
			return next(new ErrorResponse("Unauthorized", 400));
		}

		// Finds user in database
		const user = await User.findById(userId);

		// Return error if user was not found
		if (!user) {
			return next(
				new ErrorResponse(
					"Could not find user in database, please try again...",
					400
				)
			);
		}

		// const removedPlaylist = await Playlist.findByIdAndDelete(playlistId);

		// console.log("Removed playlist is: ", removedPlaylist);

		const updatedPlaylists = user.playlists.map((playlist) => {
			if (playlist._id.equals(mongoose.Types.ObjectId(playlistId))) {
				console.log("Returning this playlist");
				return playlist;
			}
		});

		console.log("updatedPlaylists is: ", updatedPlaylists);

		const updatedUser = await user.save();

		console.log("Updated user is: ", updatedUser);

		res.status(200).json({
			success: true,
			user: updatedUser,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	createPlaylist,
	getPlaylist,
	addSongToPlaylist,
	removePlaylist,
};
