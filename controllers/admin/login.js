// all the admin logIn route code goes here
const error500 = require("../errors/error500");
const _bird = require("../../utils/messageBird");

module.exports = {
	get(req, res) {
		res.render("admin/login", {
			website: {},
			login: req.isAuthenticated(),
			user: req.user,
			bird: _bird.fly,
			name: `Admin LogIn`,
			breadcrumb: `Home - Admin - Login`,
			userEmail: ""
		});
		// _bird.message("danger", err);
		// console.error(":::", err);
		// error500(req, res);
	}
}
