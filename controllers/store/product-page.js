// controlls the store product-page route
const product = require("../../libs/products");
const error500 = require("../errors/error500");

module.exports = {
	get: async (req, res)=>{
		const theProduct = await product.findById(req.query.q);
		if(theProduct.err) error500(req, res);

		const allProducts = await (await product.findAll()).data;
		if(allProducts.err) error500(req, res);

		res.render("store/product-page",{
			user: req.userDetails,
			title: "Home",
			product: theProduct.data,
			products: allProducts
		});
	}
}
