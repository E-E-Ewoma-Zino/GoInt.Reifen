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
		// console.log("file:", req.files);
		// console.log("body:", req.body);

		// this is to make sure that the categories from the req.body would be an array
		const newCategory = req.body.categories;
		const formatedCategory = typeof newCategory == "string"? newCategory.split(): newCategory;

		// If there is need create a db fro images so it can be independent... NOT IMPORTANT BECAUSE OF TIME
		product.create({
			name: req.body.name.toLowerCase(),
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
				for (let i = 0; i < formatedCategory.length; i++) {
					const name = formatedCategory[i];
					// 
					// first we add the product to the category
					category.addProduct({ producId: newProduct._id, category: name }, (addProductToCategory_err, updatedCategory) => {
						if (addProductToCategory_err) {
							console.error(":::addProductToCategory_err", addProductToCategory_err);
							if(i == formatedCategory.length - 1)
							return res.status(500).send({ status: false, message: addProductToCategory_err });
						} else if (updatedCategory) {
							console.log("adding category to product", updatedCategory);
							// here will call a method that will add the categories id to the newly created product
							product.addCategory({ productId: newProduct._id, categoryId: updatedCategory._id }, (addCategory_err, updatedProduct) => {
								if (addCategory_err) {
									console.error(":::addCategory_err", addCategory_err);
									if(i == formatedCategory.length - 1)
									return res.status(500).send({ status: false, message: addCategory_err });
								} else if (updatedProduct) {
									if(i == formatedCategory.length - 1)
									return res.status(200).send({status: true, message: updatedProduct});
								} else {
									console.error(":::addCategory_err: nothing was returned");
									if(i == formatedCategory.length - 1)
									return res.status(404).send({status: false, message: "addCategory_err: nothing was returned"});
								}
							});
						} else {
							console.error(":::addProductToCategory_err: nothing was returned");
							if(i == formatedCategory.length - 1)
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