// The module for the siteManager text
const mongoose = require("mongoose");

const siteManagerSchema = mongoose.Schema({
	siteName: String,
	siteTheme: String,
	siteUrl: String,
	contactInfo: Object

}, {timestamps: true});

module.exports = new mongoose.model("SiteManager", siteManagerSchema);