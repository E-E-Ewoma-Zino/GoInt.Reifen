// this script is for the api calls to the categories schema

const category = require("../libs/category");

module.exports = {
	get: (req, res) => {
		category.find((find_err, allCategories) => {
			if (find_err) {
				console.error(":::findCategories_err", find_err);
				return res.status(500).send({ status: false, message: find_err });
			} else if (allCategories) {
				return res.status(200).send({status: true, message: allCategories});
			} else {
				console.error(":::findCategories_err: nothing was returned");
				return res.status(404).send({status: false, message: "findCategories_err: nothing was returned"});
			}
		});
	}
}