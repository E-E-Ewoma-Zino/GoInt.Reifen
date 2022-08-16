// controlls the store categories route
const product = require("../../libs/products");
const page = require("../../module/page");
const error500 = require("../errors/error500");

module.exports = {
	get: async (req, res)=>{
		const allProducts = await (await product.findAll()).data;

		const pageDetails = await page.get({ pageName: "categories" });
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

		res.render("store/categories",{
			head,
			footer,
			user: req.userDetails,
			title: "categories",
			products: allProducts
		});
	}
}

// make route for the pages, and page