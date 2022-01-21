// This page is called by any server errors
// const _bird = require("../../utils/messageBird");

module.exports = (req, res)=>{
	return res.render("errors/error500");
}