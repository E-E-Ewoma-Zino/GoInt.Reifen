// This script helps in removing a media
const fs = require("fs");
const alerts = require("../../constants/alerts");
const products = require("../../libs/products");

module.exports = async ({ productId, mediaPath }) => {
	const test = {
		delete: true,
		update: true
	}

	// Using fs.stat to check if the file exist before deleting
	fs.stat(mediaPath, (fsStats_err, stats) => {
		if (fsStats_err) {
			console.error("fsStats_err:", fsStats_err);
			try {
				throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: alerts.DANGER };
			} catch (err) {
				console.log("The Error:", err);
			}
		}
		// console.log("Stats", stats);
		// Using fs to also delete the book file
		fs.unlink(mediaPath, (unlink_err) => {
			if (unlink_err) {
				console.error("unlink_err:", unlink_err);
				try {
					test.delete = false;
					throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: alerts.DANGER };
				} catch (err) {
					console.log("The Error:", err);
				}
			}
			console.log("=================SAVE===============");
			console.log("file deleted successfully");
		});
	});


	// remove the media form the schema that has it
	if (test.delete) {
		const updatedProduct = await products.update({
			itemToupdateId: { _id: productId },
			optionsToUse: "$pull",
			propertyToUpdate: "images",
			updateValue: mediaPath
		});
		console.log("updating after media delete... updatedProduct:", updatedProduct);
		if (updatedProduct.err) {
			test.update = false;
			return updatedProduct;
		}
	}else return { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: alerts.DANGER };

	
	return { message: "Success" , err: null, status: 200, alert: alerts.SUCCESS };
}