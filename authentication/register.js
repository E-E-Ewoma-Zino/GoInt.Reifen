// controlls all the authentication for the users
const Users = require("../schema/Users");
const passport = require("passport");
const messageBird = require("../utils/messageBird");

module.exports = (req, res) => {

	const { password, ...body } = req.body;
	console.log("res", req.body)

	console.log("body", password, body);
	// Here the user is being created and the authLevel is set to 1 to give user auth to agent pages
	Users.register(body, password, (register_err, user) => {
		if (register_err) {
			messageBird.message("danger", register_err.replace(/username/g, "email"));
			console.log(":::register_err", register_err);
			return res.status(403).json({ err: "Failed authentication user", message: register_err.message, isLogedIn: false, alert: alert.DANGER, data: user });
		} else {
			passport.authenticate("local")(req, res, () => {
				return res.redirect("/admin/dashboard");
			});
		}
	});
}