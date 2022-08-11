// controllers for services page
const page = require("../../module/page");
const error500 = require("../errors/error500");
const error404 = require("../errors/error404");

module.exports = {
	get: async (req, res) => {
		const pageDetails = await page.get({ pageName: "servicesDetails" });
		if (!pageDetails) return error500(req, res);
	
		const params = req.params.title;
		if(!pageDetails.page.content[params.toLowerCase()]) return error404(req, res);
	
		const head = {
			ogImage: pageDetails.page.meta.og.image,
			title: pageDetails.page.content[params.toLowerCase()].title,
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
	
		res.render("home/servicesDetails", {
			head: head,
			user: req.isAuthenticated() && req.user,
			page: pageDetails.page.content[params.toLowerCase()],
			footer: footer
		});
	},
	post: (req, res) => {
		console.log("body", req.body);

		res.redirect("back");
	}
}
