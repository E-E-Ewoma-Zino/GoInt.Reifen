// controllers for about us page
const page = require("../../libs/page");
const error500 = require("../errors/error500");

module.exports = (req, res)=>{
	page.getPage((getPage_err, page)=>{
		if(getPage_err){
			return error500(req, res);
		}else if (page){
			res.render("home/aboutUs",{
				title: page.aboutUs_title,
				page: page
			});
		}else{
			return error500(req, res);
		}
	});
}
