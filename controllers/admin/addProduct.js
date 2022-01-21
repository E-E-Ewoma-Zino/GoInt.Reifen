// all the admin/addProduct code goes here
// const _ = require("lodash");
const _cat = require("../../libs/category");
const logger = require("../../utils/logger");
const error500 = require("../errors/error500");
const _bird = require("../../utils/messageBird");
const product = require("../../libs/product");
const category = require("../../libs/category");


module.exports = {
	get(req, res) {

		res.render("admin/addProduct", {
			bird: _bird.fly,
		});


		// console.error(":::::", err);
		// _bird.message("danger", err);
		// error500(req, res);

	}
}