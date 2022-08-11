// this script is for the api calls to the product
const products = require("../libs/products");
const _delete = require("./helper/delete");

module.exports = {
	post: async (req, res) => {
		console.log("file:", req.files);
		console.log("body:", req.body);

		const { message, err, status, data, alert } = await products.create(req.files);
		res.status(status).json({ message, err, data, alert, status });
	},
	patch: async (req, res) => {
		console.log("body", req.body);

		const { productId, opt, propertyName, newValue } = req.body;

		const { message, err, status, data, alert } = await products.update({
			itemToupdateId: productId,
			propertyToUpdate: propertyName,
			optionsToUse: opt,
			updateValue: newValue
		});

		res.status(status).json({ message, err, data, alert, status });
	},

	put: async (req, res) => {
		console.log("files", req.files);

		const { productId, opt, propertyName, newValue } = req.files;

		const { message, err, status, data, alert } = await products.update({
			itemToupdateId: productId,
			propertyToUpdate: propertyName,
			optionsToUse: opt,
			updateValue: newValue
		});

		res.status(status).json({ message, err, data, alert, status });
	},
	
	delete: async (req, res) => {
		console.log("body", req.body);
		const { productId } = req.body;

		const { message, err, status, data, alert } = await _delete({ productId });
		res.status(status).json({ message, err, data, alert, status });
	}
}