// controllers for services page details
const page = require("../../libs/page");
const error500 = require("../errors/error500");

module.exports = {
	get: (req, res)=>{
		console.log(req.params);
		const title = req.params.title.toLowerCase();

		page.getPage((getPage_err, page)=>{
			if(getPage_err){
				return error500(req, res);
			}else if (page){
				res.render("home/servicesDetails",{
					title: page.services_details[title].title,
					service: page.services_details[title],
					page: page,
					type: title
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