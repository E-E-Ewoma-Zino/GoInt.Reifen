// controlls the store contact route
const page = require("../../module/page");
const error500 = require("../errors/error500");

module.exports = {
	get: async (req, res) => {
		const pageDetails = await page.get({ pageName: "store_contact" });
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

		res.render("store/contact", {
			head: head,
			user: req.userDetails,
			page: pageDetails.page.content,
			footer: footer
		});
	}
}
