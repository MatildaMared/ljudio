const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EMAIL_VALIDATION_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Create User Schema
const userSchema = Schema({
	_id: Schema.Types.ObjectId,
	firstName: {
		type: String,
		required: [true, "Please enter a first name..."],
	},
	lastName: {
		type: String,
		required: [true, "Please enter a last name..."],
	},
	email: {
		type: String,
		lowercase: true,
		required: [true, "Please enter an email..."],
		unique: [true, "This email is already in use..."],
		match: [EMAIL_VALIDATION_REGEX, "Please enter a valid email address..."],
	},
	password: {
		type: String,
		required: [true, "Please enter a password..."],
		minLength: [8, "Password needs to be at least 8 characters long..."],
	},
	playlists: [
		{
			type: Schema.Types.ObjectId,
			ref: "Playlist",
		},
	],
});

// Run this function before user is saved/re-saved
userSchema.pre("save", async function (next) {
	const saltRounds = 10;

	// If the password wasn't modified, exit the function
	// Else it would hash the already hashed password
	if (!this.isModified("password")) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, saltRounds);
});

// Compare the hashed password with a user entered password to see if it's a match
userSchema.methods.checkPassword = function (enteredPassword, userPassword) {
	return bcrypt.compare(enteredPassword, userPassword);
};

// Create a jwt token
userSchema.methods.getToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

const User = mongoose.model("User", userSchema);

module.exports = User;
