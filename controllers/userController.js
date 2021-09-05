const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utilites/errorResponse");
const User = require("../models/userModel");

async function getUser(req, res, next) {
	try {
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
			console.log("User id is: ", userId);
		});

		// Tries to find user in database
		const user = await User.findById(userId);

		// If no user is found, return error response to user
		if (!user) {
			return next(new ErrorResponse("User not found... Please try again", 400));
		}

		res.status(200).json({
			success: true,
			user,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { getUser };
