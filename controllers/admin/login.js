// all the admin logIn route code goes here
const _get = require("../../libs/get");
const error500 = require("../errors/error500");
const _bird = require("../../utils/messageBird");
const logger = require("../../utils/logger");

module.exports = {
	get(req, res) {
		try {
			_get.Pages((err, page)=>{
				if (err) {
					console.error(":::",err);
				}else{
					res.render("admin/login", {
						website: page.website,
						login: req.isAuthenticated(),
						user: req.user,
						bird: _bird.fly,
						name: `Admin LogIn`,
						breadcrumb: `Home - Admin - Login`,
						userEmail: ""
					});
				}
			});
		} catch (err) {
			_bird.message("danger", err);
			console.error(":::", err);
			error500(req, res);
		}
	}
}
