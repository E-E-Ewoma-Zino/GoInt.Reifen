// controlls all the authentication for the users
const bird = require("../../utils/messageBird");
const Users = require("../../schema/Users");
const passport = require("passport");

module.exports = {
	register: (req, res) => {
		console.log("body", req.body);
		// destructured the password and the rest of req.body
		const { password, ...body} = req.body;
		
		// Here the user is being created and the authLevel is set to 1 to give user auth to admin pages
		Users.register(body, password, (register_err, user) => {
			if (register_err) {
				console.log(":::register_err", register_err);
				bird.message("danger", register_err);
				// NOTE: change this to res.redirect("back");
				res.redirect("/");
			} else {
				passport.authenticate("local")(req, res, () => {
					bird.message("success", "Successful Registered");
					// NOTE: change this to res.redirect("back");
					res.redirect("/store/");
				});
			}
		});
	},
	login: (req, res, next) => {
		// LogIn a user
		// I am using the passport custom callback to authenticate the user
		passport.authenticate("local", function (logIn_err, user, info) {
			// if any exceptions happen, come here
			if (logIn_err) {
				bird.message("danger", logIn_err, info.message);
				console.log("::logIn_err:", logIn_err, info.message);
				return next(logIn_err);
			}
			// if user is not found, come here
			if (!user) {
				bird.message("danger", info.message);
				console.log("NO USER FOUND!", info.message);
				return res.redirect("back");
			}
			// if everything goes well, come here
			req.logIn(user, function (reqLogIn_err) {
				if (reqLogIn_err) {
					bird.message("danger", reqLogIn_err);
					console.log("::reqLogIn_err:", reqLogIn_err);
					return next(reqLogIn_err);
				}

				// checking where the auth is coming from
				if (req.body.auth) {
					// because i have done the authLevel checker function i can do this here
					if (!user.authLevel) {
						bird.message("success", "Welcome back " + req.user.username);
						return res.redirect("/store");
					}
					else {
						bird.message("success", "Welcome back Admin " + req.user.username);
						return res.redirect("/admin/dashboard");
					}
				}
				else {
					bird.message("success", "Welcome back " + req.user.username);
					return res.redirect("back");
				}
			});
		})(req, res, next);
	},
	logOut: (req, res) => {
		bird.message("primary", "Bye " + req.user.username);
		req.logOut();
		res.redirect("/");
	}
}