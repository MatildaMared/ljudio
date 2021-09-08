const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utilites/errorResponse");
const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

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

		console.log("User id is: ", userId);
		const user = await User.findById(userId);
		console.log("User is: ", user);

		const playlist = await Playlist.create({
			_id: new mongoose.Types.ObjectId(),
			userId: user._id,
			title,
		});

		user.playlists.push(playlist._id);
		console.log("User before save: ", user);

		await user.save();

		res.status(200).json({
			success: true,
			playlist,
			user,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { createPlaylist };
