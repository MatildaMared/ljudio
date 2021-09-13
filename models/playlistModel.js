const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = Schema({
	_id: Schema.Types.ObjectId,
	title: {
		type: String,
		required: [true, "A Playlist must have a title..."],
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	songs: {
		type: Array,
		default: [],
	},
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
