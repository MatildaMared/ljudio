const User = require("../models/userModel");
const ErrorResponse = require("../utilites/errorResponse");
const mongoose = require("mongoose");

async function signup(req, res, next) {
	try {
		const { firstName, lastName, email, password } = req.body;
		const user = await User.create({
			_id: new mongoose.Types.ObjectId(),
			firstName,
			lastName,
			email,
			password,
		});

		res.status(200).json({
			success: true,
			token: user.getToken(),
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				playlists: user.playlists,
				followedPlaylists: user.followedPlaylists,
			},
		});
	} catch (err) {
		next(err);
	}
}

async function login(req, res, next) {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return next(new ErrorResponse("Please enter email and password...", 400));
		}

		const user = await User.findOne({ email });
		const correctPassword = await user?.checkPassword(password, user.password);

		if (!user || !correctPassword) {
			return next(new ErrorResponse("Incorrect credentials...", 400));
		}

		await user.populate("playlists");
		await user.populate("followedPlaylists");

		res.status(200).json({
			success: true,
			token: user.getToken(),
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				playlists: user.playlists,
				followedPlaylists: user.followedPlaylists,
			},
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { signup, login };
