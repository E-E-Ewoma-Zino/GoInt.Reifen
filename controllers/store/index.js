// controlls the store home route
const product = require("../../libs/products");
const getCategories = require("./function/getCategories");

module.exports = {
	get: async (req, res) => {
		const allProducts = await (await product.findAll()).data;

		res.render("store/index", {
			user: req.userDetails,
			title: "Home",
			categories: getCategories(allProducts),
			products: allProducts,
		});
	}
}