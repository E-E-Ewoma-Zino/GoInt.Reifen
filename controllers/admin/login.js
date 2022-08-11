// all the admin logIn route code goes here
const bird = require("../../utils/messageBird");

module.exports = {
	get(req, res) {
		res.render("admin/login", {
			bird: bird.fly
		});
	}
}
