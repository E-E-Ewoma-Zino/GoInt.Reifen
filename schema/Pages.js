// The module for the page text
const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
	// components
	// _head
	_head_og_site_name: String,
	_head_og_site: String,
	_head_og_title: String,
	_head_og_description: String,
	_head_og_image: String,
	_head_og_url: String,
	// footer
	_footer_about: String,
	_footer_sitename: String,

	// utils
	// details
	details1_title: String,
	details1_body: Array,
	details2_title: String,
	details2_text: String,

	// index page
	index_title: String,
	header_title: String,
	header_text: String,
	introduction_title: String,
	introduction_text: String,
	services_home_body: Array,
	services_title: String,
	services_text: String,

	// aboutUs page
	aboutUs_page_title: String,
	aboutUs_title: String,
	aboutUs_header: String,
	aboutUs_text: String,
	aboutUs_body: Array,
	aboutUs_body_services: Array,
	aboutUs_whyUs_title: String,
	aboutUs_whyUs_body: Array,
	aboutUs_region_title: String,
	aboutUs_region_text: String,
	aboutUs_region_note_title: String,
	aboutUs_region_note_text: String,
	aboutUs_endNote: String,
});

module.exports = new mongoose.model("Page", pageSchema);