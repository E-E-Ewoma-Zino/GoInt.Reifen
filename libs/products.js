// products
const Edit = require("./edit");
const products = require("../schema/Products");

class Products extends Edit{
	constructor(schema){
		super(schema);
	}
}

module.exports = new Products(products);