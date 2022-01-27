// stores pages to db and gets them
const Pages = require("../schema/Pages");

class Page {
	getPage(callback) {
		Pages.findOne({}, (err, page) => {
			if (err) {
				console.log(":::", err);
				callback(err, null);
			} else if (page) {
				callback(null, page);
			} else {
				callback(null, null);
			}
		});
	}

	createPage(callback) {
		this.getPage((err, page) => {
			if (err) {
				console.log(":::", err);
			} else {
				if (page) {
					console.log("Set Page");
				} else {
					console.log("New Page");
					Pages.create({
						// components
						// _head
						_head_og_site_name: require("../pages/components")["_head"].og_site_name,
						_head_og_site: require("../pages/components")["_head"].og_site,
						_head_og_title: require("../pages/components")["_head"].og_title,
						_head_og_description: require("../pages/components")["_head"].og_description,
						_head_og_image: require("../pages/components")["_head"].og_image,
						_head_og_url: require("../pages/components")["_head"].og_url,
						// footer
						_footer_about: require("../pages/components")["_footer"].about,
						_footer_sitename: require("../pages/components")["_footer"].sitename,

						// utils
						// details
						details1_title: require("../pages/utils").details1.title,
						details1_body: require("../pages/utils").details1.body, // Array
						details2_title: require("../pages/utils").details2.title,
						details2_text: require("../pages/utils").details2.text,

						// index
						index_title: require("../pages/index").title,
						header_title: require("../pages/index").header.title,
						header_text: require("../pages/index").header.text,
						introduction_title: require("../pages/index").introduction.title,
						introduction_text: require("../pages/index").introduction.text,

						// services index page
						services_title: require("../pages/index").services.title,
						services_text: require("../pages/index").services.text,
						services_home_body: require("../pages/index").services.body,
						services_details: require("../pages/servicesDetails"),

						// sercices page
						services_page_title: require("../pages/services").title,
						services_page_body: require("../pages/services").body,

						// about page
						aboutUs_title: require("../pages/aboutUs").title,
						aboutUs_header: require("../pages/aboutUs").header,
						aboutUs_body: require("../pages/aboutUs").body,
						aboutUs_body_services: require("../pages/aboutUs").services,
						aboutUs_whyUs_title: require("../pages/aboutUs").whyUs.title,
						aboutUs_whyUs_body: require("../pages/aboutUs").whyUs.body,
						aboutUs_region_title: require("../pages/aboutUs").region.title,
						aboutUs_region_text: require("../pages/aboutUs").region.text,
						aboutUs_region_note_title: require("../pages/aboutUs").region.note.title,
						aboutUs_region_note_text: require("../pages/aboutUs").region.note.text,
						aboutUs_endNote: require("../pages/aboutUs").endNote,
					}, (err, page) => {
						if (err) {
							console.log("createPage_err:::", err);
							callback(err, null);
						} else if (page) {
							callback(null, true);
						}
						else {
							callback(null, null);
						}
					});
				}
			}
		});
	}

	dropPage() {
		Pages.deleteMany({}, (pageDelete_err) => {
			if (pageDelete_err) {
				console.log(":::pageDelete_err:", pageDelete_err);
			}
			else {
				console.log("Deleted Page");
			}
		});
	}

	update(data, callback) {
		Pages.replaceOne({}, data, (pageUpdate_err) => {
			if (pageUpdate_err) {
				console.log(":::pageUpdate_err", pageUpdate_err);
				callback(pageUpdate_err, null);
			} else {
				callback(null, true);
			}
		});
	}
}

module.exports = new Page();