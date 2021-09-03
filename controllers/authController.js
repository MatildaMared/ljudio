const User = require("../models/userModel");
const ErrorResponse = require("../utilites/errorResponse");

async function signup(req, res, next) {
	try {
		const { firstName, lastName, email, password } = req.body;
		const user = await User.create({ firstName, lastName, email, password });

		res.status(200).json({
			success: true,
			user: {
				_id: user._id,
				token: user.getToken(),
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
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

		res.status(200).json({
			success: true,
			token: user.getToken(),
			user: {
				_id: user._id,
				token: user.getToken(),
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { signup, login };
