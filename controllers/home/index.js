// controllers for index page
const page = require("../../module/page");
const error500 = require("../errors/error500");

module.exports = async (req, res) => {
	const pageDetails = await page.get({ pageName: "home" });
	if (!pageDetails) return error500(req, res);

	const head = {
		ogImage: pageDetails.page.meta.og.image,
		title: pageDetails.page.meta.title,
		ogUrl: pageDetails.page.meta.og.url,
		ogTitle: pageDetails.page.meta.og.title,
		themeColor: pageDetails.siteSetting.siteTheme,
		description: pageDetails.page.meta.description
	}

	const footer = {
		title: pageDetails.page.footer.title,
		contact: pageDetails.siteSetting.contactInfo,
		siteUrl: pageDetails.siteSetting.siteUrl,
		siteName: pageDetails.siteSetting.siteName
	}

	res.render("home/index", {
		head: head,
		user: req.isAuthenticated() && req.user,
		page: pageDetails.page.content,
		footer: footer
	});
}
