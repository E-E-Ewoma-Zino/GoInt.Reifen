// The module for the users
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	// Things needed for all user Schema
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	phoneNo: String,
	// things need for a user for this site
	// 
	// Things needed for the authorization for admin and user.
	authLevel: {
		type: Number,
		min: 0,
		max: 1
	},
	// Things needed for all user Schema
	createdAt: {
		type: Date,
		default: Date.now
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema);