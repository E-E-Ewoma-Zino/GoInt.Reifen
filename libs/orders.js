// order
const Edit = require("./edit");
const order = require("../schema/Orders");

class Order extends Edit{
	constructor(schema){
		super(schema);
	}
}

module.exports = new Order(order);