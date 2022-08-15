const alerts = require("../../constants/alerts");
const products = require("../../libs/products");


module.exports = async (productData) => {
	const { productId } = productData;

	// update the Product base on each data in the productData obj
	for (const key in productData) {
		if (Object.hasOwnProperty.call(productData, key)) {
			const data = productData[key];

			if (key !== "categories" && data === undefined || data === null) continue;

			const updateProduct = await products.update({
				itemToupdateId: { _id: productId },
				optionsToUse: key === "img" ? "$push" : "$set",
				propertyToUpdate: key,
				updateValue: data
			});

			if (updateProduct.err) return updateProduct;
		}
	}

	return { status: 200, alert: alerts.SUCCESS, message: "Product Updated", err: null, data: true };
}