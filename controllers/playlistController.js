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
		user.playlists.unshift(playlist._id);

		// Save changes in user to database
		const updatedUser = await user.save();

		// Populate the playlists array before sending data back to user
		await updatedUser.populate("playlists");

		// Send back the created playlist
		// and user in the response
		res.status(200).json({
			success: true,
			playlist,
			user: {
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,
				email: updatedUser.email,
				playlists: updatedUser.playlists
			},
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

		// Populate playlists array inside user document
		await user.populate("playlists");

		res.status(200).json({
			success: true,
			playlist,
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				playlists: user.playlists
			},
		});
	} catch (err) {
		next(err);
	}
}

async function removePlaylist(req, res, next) {
	try {
		playlistId = req.params.id;

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

		// Remove playlist from playlist collection
		await Playlist.findByIdAndDelete(playlistId);

		// Create a new array based on the playlists array in
		// the user document, and filter out the deleted playlist
		const updatedPlaylists = user.playlists.filter((playlist) => {
			return !playlist._id.equals(mongoose.Types.ObjectId(playlistId));
		});

		// Sets the user playlists array equal to the
		// new filtered array
		user.playlists = updatedPlaylists;

		// Save user to the database
		const updatedUser = await user.save();

		// Populate the user document with the playlists
		await updatedUser.populate("playlists");

		// Send response back to user
		res.status(200).json({
			success: true,
			user: {
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,
				email: updatedUser.email,
				playlists: updatedUser.playlists
			}
		});
	} catch (err) {
		next(err);
	}
}

async function removeSongFromPlaylist(req, res, next) {
	try {
		playlistId = req.params.playlistId;
		const videoId = req.params.videoId;
		console.log("Playlist id is: ", playlistId);
		console.log("Video id is: ", videoId);

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

		// Create new array based on playlist.songs
		// and filter out the song that is supposed to
		// be deleted
		const updatedSongs = playlist.songs.filter(
			(song) => song.videoId !== videoId
		);

		// Set playlist.songs equal to the filtered array
		playlist.songs = updatedSongs;

		// Save playlist to the database
		const updatedPlaylist = await playlist.save();

		// Populate the playlists array in user document
		await user.populate("playlists");

		// Send response back to user
		res.status(200).json({
			success: true,
			updatedPlaylist,
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				playlists: user.playlists
			}
		});
	} catch (err) {
		next(err);
	}
}

async function changeTitle(req, res, next) {
	try {
		const { title } = req.body;
		const playlistId = req.params.id;

		const token = req.headers.authorization.split(" ")[1];
		const userId = await getUserIdFromToken(token);

		if (userId === null) {
			return next(new ErrorResponse("Unauthorized", 400));
		}

		const user = await User.findById(userId);

		//Update the name of the playlist 
		const filter = { _id: playlistId }
		const update = { title: title }

		// `doc` is the document _before_ `update` was applied
		let doc = await Playlist.findOneAndUpdate(filter, update, {
			returnOriginal: false
		});

		// Save changes in user to database
		const updatedUser = await user.save();

		// Populate the playlists array before sending data back to user
		await updatedUser.populate("playlists");

		// Send back the created playlist
		// and user in the response
		res.status(200).json({
			success: true,
			doc,
			user: {
				playlists: updatedUser.playlists
			},
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
	removeSongFromPlaylist,
	changeTitle
};
