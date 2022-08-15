// help to delete form site
const products = require("../../libs/products");
const removeMedia = require("./removeMedia");

module.exports = async ({ productId }) => {
	const theProduct = await products.findById(productId);
	if (!theProduct.data) return theProduct;

	theProduct.data.img.forEach(async (image, index, arr) => {
		const deleteImg = await removeMedia({ productId: theProduct.data.images, mediaPath: image.path });
		if (deleteImg.err) return deleteImg;
	});

	const deletedProduct = await products.remove(productId);
	return deletedProduct;
}