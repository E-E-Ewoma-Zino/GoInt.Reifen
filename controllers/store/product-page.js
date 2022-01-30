// controlls the store product-page route
const product = require("../../libs/product");
const error500 = require("../errors/error500");

module.exports = {
	get: (req, res)=>{
		product.findByIdAndPopulate(req.query.q, "categories", (findProduct_err, foundProduct)=>{
			if(findProduct_err){
				return error500(req, res);
			}else if (foundProduct){
				product.find((findAllProducts_err, foundAllProducts)=>{
					if(findAllProducts_err){
						return error500(req, res);
					}else if (foundAllProducts){
						res.render("store/product-page",{
							user: req.userDetails,
							title: foundProduct.name,
							products: foundAllProducts,
							product: foundProduct
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
