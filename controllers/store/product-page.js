// controlls the store product-page route
const product = require("../../libs/products");
const error500 = require("../errors/error500");
const page = require("../../module/page");

module.exports = {
	get: async (req, res)=>{
		const theProduct = await product.findById(req.query.q);
		if(theProduct.status !== 200) return error500(req, res);

		const allProducts = await (await product.findAll()).data;
		if(allProducts.err) return error500(req, res);

		const pageDetails = await page.get({ pageName: "productPage" });
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

		res.render("store/product-page",{
			head,
			footer,
			user: req.userDetails,
			title: theProduct.data.name,
			product: theProduct.data,
			products: allProducts
		});
	}
}
