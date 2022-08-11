// all the admin dashboard route code goes here
const bird = require("../../utils/messageBird");

module.exports = {
	get(req, res) {
		res.render("admin/dashboard", {
			bird: bird.fly
		});
	}
}
