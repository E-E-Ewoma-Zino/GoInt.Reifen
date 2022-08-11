// The module for the page text
const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
	page: String,
	meta: {
		title: String,
		description: String,
		keywords: String,
		og: {
			title: String,
			url: String,
			description: String,
			site_name: String,
			image: String
		}
	},
	content: Object,
	footer: Object
}, { timestamps: true });

module.exports = new mongoose.model("Page", pageSchema);