// controlls the store categories route
const product = require("../../libs/products");
const error500 = require("../errors/error500");
const getCategories = require("./function/getCategories");

module.exports = {
	get: async (req, res)=>{
		const allProducts = await (await product.findAll()).data;

		res.render("store/categories",{
			user: req.userDetails,
			title: "Home",
			products: allProducts,
			categories: getCategories(allProducts)
		});
	}
}

// make route for the pages, and page