// 
const messageBird = require("../../utils/messageBird");
const products = require("../../libs/products");
const error404 = require("../errors/error404");

module.exports = async (req, res) => {
	const theProduct = await products.findById(req.query.id);
	if(theProduct.err) return error404(req, res);

	res.render("admin/editProduct", {
		bird: messageBird.fly,
		product: theProduct.data
	});
}