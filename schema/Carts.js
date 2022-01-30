const mongoose = require("mongoose");

// @desc	cart Schema
const cartSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	item: [{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product"
		},
		quantity: Number
	}],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Cart", cartSchema);