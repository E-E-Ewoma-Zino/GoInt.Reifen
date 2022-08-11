const mongoose = require("mongoose");

// @desc    Product Schema
const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	img: {
		type: Array,
		required: true
	},
	categories: Array,
	price: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	totalNo: {
		type: Number,
	},
	isAvaliable: {
		type: Boolean,
		default: true
	},
	isFeatured: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);