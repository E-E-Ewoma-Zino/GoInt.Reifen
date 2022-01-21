// all the order list dashboard route code goes here
const _order = require("../../libs/orders");
const error500 = require("../errors/error500");
const _bird = require("../../utils/messageBird");
const logger = require("../../utils/logger");

module.exports = {
	get(req, res) {
		try {
			_order.all((err, orders) => {
				if (err) {
					console.log(":::", err);
				}
				else {
					res.render("admin/order", {
						bird: _bird.fly,
						orders: orders
					});
					// res.send(orders);
				}
			});
		} catch (err) {
			_bird.message("danger", err);
			console.error(":::", err);
			error500(req, res);
		}
	}
}
