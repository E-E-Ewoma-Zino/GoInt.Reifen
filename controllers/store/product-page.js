// controlls the store product-page route
const page = require("../../libs/page");
const error500 = require("../errors/error500");

module.exports = {
	get: (req, res)=>{
		page.getPage((getPage_err, page)=>{
			if(getPage_err){
				return error500(req, res);
			}else if (page){
				res.render("store/product-page",{
					title: page.index_title,
					page: page
				});
			}else{
				return error500(req, res);
			}
		});
	}
}
