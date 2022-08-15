// controlls the store categories route
const product = require("../../libs/products");

module.exports = {
	get: async (req, res)=>{
		const allProducts = await (await product.findAll()).data;

		res.render("store/categories",{
			user: req.userDetails,
			title: "categories",
			products: allProducts
		});
	}
}

// make route for the pages, and page