// get all the categories that exists in the product and return them with out repeting anyone
function getCategories(productsArr) {
	const everyCategory = [];
	const categories = [];

	console.log(">>>", productsArr)
	productsArr.forEach(product => {
		everyCategory.push(...product.categories);
	});

	everyCategory.forEach((cat, index) => {
		if (index === 0) categories.push(cat);
		if (categories.indexOf(cat) === -1) categories.push(cat);
	});

	return categories;
}