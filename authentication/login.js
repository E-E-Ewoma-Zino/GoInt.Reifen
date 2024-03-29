// controlls all the authentication for the users
const alert = require("../constants/alerts");
const passport = require("passport");
const messageBird = require("../utils/messageBird");

module.exports = (req, res, next) => {
	console.log("here", req.body);
	// console.log("req", req._parsedOriginalUrl.pathname);
	// LogIn a user
	// I am using the passport custom callback to authenticate the user
	passport.authenticate("local", function (logIn_err, user, info) {
		// if any exceptions happen, come here
		// TODO: Add means to tell the user that the process failed
		if (logIn_err) {
			messageBird.message("danger", logIn_err + "\n\n" + info.message.replace(/username/g, "email"));
			console.log("::logIn_err:", logIn_err, info.message);
			return next(logIn_err);
		}

		// if user is not found, come here
		if (!user) {
			messageBird.message("danger", info.message.replace(/username/g, "email"));
			console.log("NO USER FOUND!", info.message);
			return res.redirect("back");
		}
		
		// if everything goes well, come here
		req.logIn(user, function (reqLogIn_err) {
			if (reqLogIn_err) {
				messageBird.message("danger", reqLogIn_err.replace(/username/g, "email"));
				console.log("::reqLogIn_err:", reqLogIn_err);
				return next(reqLogIn_err);
			}

			res.redirect("/admin/dashboard");
		});
	})(req, res, next);
}