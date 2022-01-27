// controlls the store home route
const product = require("../../libs/product");
const category = require("../../libs/category");
const error500 = require("../errors/error500");

module.exports = {
	get: (req, res)=>{
		product.findAndPopulate((findProduct_err, allProducts)=>{
			if(findProduct_err){
				return error500(req, res);
			}else if (allProducts){
				category.find((findCategory_err, allCategories)=>{
					if(findCategory_err){
						return error500(req, res);
					}else if (allCategories){
						res.render("store/index",{
							user: req.userDetails,
							title: "Home",
							products: allProducts,
							categories: allCategories
						});
					}else{
						return error500(req, res);
					}
				});
			}else{
				return error500(req, res);
			}
		});
	}
}
