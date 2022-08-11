// 

const messageBird = require("../../utils/messageBird");

module.exports = (req, res) => {
	res.render("editProduct", {
		bird: messageBird.fly
	});
}