// this script is for the api calls to the product
const product = require("../libs/product");
const category = require("../libs/category");

module.exports = {
	get: (req, res) => {
		product.find((find_err, allProducts) => {
			if (find_err) {
				console.error(":::findProduct_err", find_err);
				return res.status(500).send({ status: false, message: find_err });
			} else if (allProducts) {
				return res.status(200).send({status: true, message: allProducts});
			} else {
				console.error(":::findProduct_err: nothing was returned");
				return res.status(404).send({status: false, message: "findProduct_err: nothing was returned"});
			}
		});
	},
	post: (req, res) => {
		console.log("file:", req.files);
		console.log("body:", req.body);

		// If there is need create a db fro images so it can be independent... NOT IMPORTANT BECAUSE OF TIME
		product.create({
			name: req.body.name[0].toLowerCase(),
			img: req.files,
			price: req.body.price,
			totalNo: req.body.totalNo,
			description: req.body.description
		}, (createProduct_err, newProduct) => {
			if (createProduct_err) {
				console.error(":::createProduct_err:", createProduct_err);
				return res.status(500).send({ status: false, message: createProduct_err });
			} else if (newProduct) {
				console.log("Added new product");
				// After the product has been created, add the categories that the product is under to it.
				// The categories properties of the product schema is an arroy of category id

				// using a for statement so i can return out or continue of the category gotten from the req.body.categories do this
				for (let i = 0; i < req.body.categories.length; i++) {
					const name = req.body.categories[i];
					// 
					// first we add the product to the category
					category.addProduct({ producId: newProduct._id, category: name }, (addProductToCategory_err, updatedCategory) => {
						if (addProductToCategory_err) {
							console.error(":::addProductToCategory_err", addProductToCategory_err);
							// if the loop is not over and the current iteration is here continue to 
							// the next loop so it will not crash with error: can't send hearders more than once
							// continue;
							return res.status(500).send({ status: false, message: addProductToCategory_err });
						} else if (updatedCategory) {
							// here will call a method that will add the categories id to the newly created product
							product.addCategory({ productId: newProduct._id, categoryId: updatedCategory._id }, (addCategory_err, updatedProduct) => {
								if (addCategory_err) {
									console.error(":::addCategory_err", addCategory_err);
									// if the loop is not over and the current iteration is here continue to 
									// the next loop so it will not crash with error: can't send hearders more than once
									// continue;
									return res.status(500).send({ status: false, message: addCategory_err });
								} else if (updatedProduct) {
									// if the loop is not over and the current iteration is here continue to 
									// the next loop so it will not crash with error: can't send hearders more than once
									// continue;
									return res.status(200).send({status: true, message: updatedProduct});
								} else {
									console.error(":::addCategory_err: nothing was returned");
									// if the loop is not over and the current iteration is here continue to 
									// the next loop so it will not crash with error: can't send hearders more than once
									// continue;
									return res.status(404).send({status: false, message: "addCategory_err: nothing was returned"});
								}
							});
						} else {
							console.error(":::addProductToCategory_err: nothing was returned");
							// if the loop is not over and the current iteration is here continue to 
							// the next loop so it will not crash with error: can't send hearders more than once
							// continue;
							return res.status(404).send({status: false, message: "addProductToCategory_err: nothing was returned"});
						}
					});
				}
			} else {
				console.error(":::addProduct_err: nothing was returned");
				return res.status(404).send({status: false, message: "addProduct_err: nothing was returned"});
			}
		});
	}
}