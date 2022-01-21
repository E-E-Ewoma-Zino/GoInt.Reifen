// controlls the products schema
const Products = require("../schema/Products");
const edit = require("./edit");

class Product extends edit {
	constructor(schema){
		super(schema);
	}

	addCategory({productId: pId, categoryId: cId}, callback){
		this.findById(pId, (findProduct_err, foundProduct)=>{
			if(findProduct_err){
				return callback(findProduct_err, null);
			}else if(foundProduct){
				foundProduct.updateOne({}, {$push: {categories: cId}}, (updateProduct_err, done)=>{
					if(updateProduct_err){
						return callback(updateProduct_err, null);
					}else if(done){
						console.log("product.addCategory", done);
						return callback(null, done);
					}else{
						return callback(null, null);
					}
				});
			}else{
				return callback(null, null);
			}
		});
	}
}

module.exports = new Product(Products);