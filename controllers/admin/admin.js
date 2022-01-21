// all the admin route code goes here
const _get = require("../../libs/get");
const error500 = require("../errors/error500");
const _bird = require("../../utils/messageBird");


module.exports = (req, res) => {
	try {
		res.redirect("admin/login");
	} catch (err) {
		console.error("::::::>>:", err);
		_bird.message("danger", err);
		error500(req, res);
	}
}