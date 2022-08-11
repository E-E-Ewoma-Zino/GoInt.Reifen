const bird = require("../../utils/messageBird");

module.exports = {
	get(req, res) {
		console.log("req", req.body);

		res.render("admin/addProduct", {
			bird: bird.fly,
		});

	}
}