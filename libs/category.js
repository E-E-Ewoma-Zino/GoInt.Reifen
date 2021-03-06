// get the Category
const Categories = require("../schema/Category");
const Edit = require("./edit");

class Category extends Edit {
	constructor(schema) {
		super(schema);
	}

	// Add product to category
	addProduct({ producId: id, category: name }, callback) {
		this.findByName(name, (findName_err, foundCategory) => {
			if (findName_err) {
				return callback(findName_err, null);
			} else if (foundCategory) {
				this.update({
					itemToupdateId: foundCategory._id,
					options: "$push",
					whatToUpdate: "products",
					newUpdate: id
				}, (update_err, finishUpdate) => {
					if (update_err) {
						return callback(update_err, null);
					} else if (finishUpdate) {
						// I returned the category that was gotten from the search instead of the finishUpdate
						return callback(null, foundCategory);
					} else {
						return callback(null, null);
					}
				});
			} else {
				// create a new category and add the product to it
				this.create({
					name: name,
					products: id
				}, (createCategory_err, newCategory) => {
					if (createCategory_err) {
						return callback(createCategory_err, null);
					} else if (newCategory) {
						return callback(null, newCategory);
					} else {
						return callback(null, null);
					}
				});
			}
		});
	}

}

module.exports = new Category(Categories);