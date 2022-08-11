// all the order list dashboard route code goes here
const bird = require("../../utils/messageBird");

module.exports = {
	get(req, res) {
		res.render("orders", {
			bird: bird.fly
		});
	}
}
