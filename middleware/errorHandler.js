// const ErrorResponse = require("../utilites/errorResponse");

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	// Sends back a json object with error message to user
	res.status(err.statusCode || 500).json({
		success: false,
		error: error.message || "Server error...",
	});
};

module.exports = errorHandler;
