// controlls the store login-register route
const page = require("../../libs/page");
const error500 = require("../errors/error500");

module.exports = {
	get: (req, res) => {
		res.render("store/login-register", {
			user: req.userDetails,
		});
	}
}
