// all the order details dashboard route code goes here
const order = require("../../libs/orders");
const error500 = require("../errors/error500");
const bird = require("../../utils/messageBird");

module.exports = {
	get: async (req, res) => {
		try {
			// ci is just for people not to easily know my orderId
			const orderId = req.query.ci;

			const theOrder = await order.findById(orderId);
			res.render("admin/orderDetails", {
				bird: bird.fly,
				order: theOrder
			});

		} catch (err) {
			bird.message("danger", err);
			console.error(":::", err);
			error500(req, res);
		}
	}
}
