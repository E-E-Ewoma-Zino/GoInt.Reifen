// =============================== SUBMIT FORM ================================
// listens for form submit, if form is submitted use the formdata to post the form
const formData = document.getElementsByTagName("form")[0];
formData.onsubmit = async (e) => {
	e.preventDefault();

	const productForm = new FormData(formData);
	
	getNewCategory().forEach(category => {
		productForm.append("categories", category.toLowerCase());
	});

	axios.post("/api/products", productForm).then((res) => {
		console.log("res:", res);
		if(res.data.status) messager({
			replace: ["danger", "success"],
			message: "Added new product"
		});
	}).catch((err) => {
		console.error(":::err", err);
	});
};