// =============================== SUBMIT FORM ================================
// listens for form submit, if form is submitted use the formdata to post the form
const formData = document.getElementsByTagName("form")[0];
formData.onsubmit = async (e) => {
	e.preventDefault();

	const productForm = new FormData(formData);
	
	productForm.append("productId", itemId); // item id

	getNewCategory().forEach(category => {
		productForm.append("categories", category.toLowerCase()); // add categories
	});

	axios.patch("/api/products", productForm).then((res) => {
		if(res.data.status) messager({
			replace: ["danger", "success"],
			message: "Updated Product"
		});
	}).catch((err) => {
		console.error(":::err", err);
		messager({
			replace: ["success", "danger"],
			message: "Failed to update product"
		});
	});
};