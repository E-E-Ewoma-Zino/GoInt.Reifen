// this script is for the api calls to the product
const products = require("../libs/products");
const _delete = require("./helper/delete");
const updateProduct = require("./helper/updateProduct");

module.exports = {
	post: async (req, res) => {
		console.log("file:", req.files);
		console.log("body:", req.body);

		const { message, err, status, data, alert } = await products.create({ img: req.files, ...req.body });
		res.status(status).json({ message, err, data, alert, status });
	},
	patch: async (req, res) => {
		console.log("file:", req.files);
		console.log("body:", req.body);

		const reqData = {
			img: req.files,
			...req.body
		}

		const { message, err, status, data, alert } = await updateProduct(reqData);
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