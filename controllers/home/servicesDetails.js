// controllers for services page details
const page = require("../../libs/page");
const error500 = require("../errors/error500");

module.exports = {
	get: (req, res)=>{
		console.log(req.params)
		page.getPage((getPage_err, page)=>{
			if(getPage_err){
				return error500(req, res);
			}else if (page){
				res.render("home/servicesDetails",{
					title: page.services_title,
					page: page,
					type: req.params.title
				});
			}else{
				return error500(req, res);
			}
		});
	},
	post: (req, res)=>{
		console.log(req.body, req.params, req.query);
		res.send("done");
	}
}