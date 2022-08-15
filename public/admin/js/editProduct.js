// This script is what would be used to add products to the store

// ================================== GET CATEGORIES =========================
// Get all the avaliable categories
axios.get("/api/get/product/all").then((res) => {

	if (res.data.err) return messager({
		replace: ["success", "danger"],
		message: "Category list is empty " + res.data.err
	});

	// this would be used to show the categories in the dom
	const categoryList = document.getElementById("categoryList");

	getCategories(res.data.data).forEach(category => {
		const categoryOption = document.createElement("option");

		categoryOption.innerText = category;
		categoryList.append(categoryOption);
	});
}).catch((err) => {
	messager({
		replace: ["success", "danger"],
		message: "Failed to fetch category list"
	});
	console.error(":::err", err);
});

// ========================= STORE A NEW CATEGORY ====================
// adds an new category to the list of category to be submitted
const newCategory = [];
function addNewCategory(name) {
	return newCategory.push(name);
}

// ========================= GET ALL NEW CATEGORY ====================
// returns all the new categories
function getNewCategory() {
	console.log("All categories:", newCategory);
	return newCategory;
}

// ========================= REMOVE A CATEGORY ====================
// removes a selected category
function removeNewCategory(name) {
	console.log("name", name);
	console.log("remove", newCategory.indexOf(name));
	return newCategory.splice(newCategory.indexOf(name), 1);
}

// ========================= ADD BTN FOR NEW CATEGORY IN DOM ===================
// When the add category btn is clicked this function will create 
// a container to show the user that the cartgory has been added to the list
const addCategory = document.getElementById("addCategory");
addCategory.addEventListener("click", () => {
	const formCategoryName = document.getElementById("formCategoryName");

	// if the value in the formCategoryName is empty send error message
	if(formCategoryName.value == '' || formCategoryName == null) return messager({
		replace: ["success", "danger"],
		message: "Enter a category name!"
	});

	const seletedCategory = document.getElementById("seletedCategory");
	const container = document.createElement("span");

	container.classList.add("p-1");
	container.classList.add("m-2");
	container.classList.add("shadow");
	container.classList.add("border");
	container.classList.add("rounded");
	container.classList.add("cursor-pointer");
	container.classList.add("activeCategory");

	// assign a value to the container
	container.innerText = formCategoryName.value;
	// add the value of the container to the newCategory arr
	addNewCategory(formCategoryName.value);
	
	// empty the input after adding a new category
	formCategoryName.value = null;
	seletedCategory.append(container);
	// assign an event listiner for all containers being created
	listenForCategory_remove(container);
});

// ========================= REMOVE A CATEGORY FROM THE DOM =========================
// this function would call the event listener to make sure that it listens for a click to remove a category
const activeCategory = document.getElementsByClassName("activeCategory");
function listenForCategory_remove(category) {
	category.addEventListener("click", (e) => {
		category.remove();
		removeNewCategory(e.target.innerText);
		getNewCategory();
	});
}


// ==================== Clear Form ============================
function clearForm() {
	const inputs = document.getElementsByTagName("input");
	const textArea = document.getElementsByTagName("textarea");
	const seletedCategory = document.getElementById("seletedCategory");

	// clear inputs
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		input.value = null;
	}

	// clear textArea
	textArea.value = null;

	// clear newCategory array
	newCategory = [];

	// clear the activeCategory in the dom
	seletedCategory.innerHTML = null;
}

// Function to remove an image from a product
// Get req that has a query
// this function recieves an index from the delete btn and uses that index to know where to delete the image
async function removeImage(productId, mediaPath) {
	const data = { productId, mediaPath }

	try {
		const deleted = await axios.delete("/api/deletemedia", { data: data });

		if (deleted.data.status !== 200) return messager({
			replace: ["success", "danger"],
			message: "Delete Failed. Try again."
		});

		messager({
			replace: ["danger", "success"],
			message: "Deleted!"
		});

	} catch (err) {
		messager({
			replace: ["success", "danger"],
			message: "Delete Failed. Try again."
		});
		console.log("Error:", err);
		console.log("Error:", err.response.data);
	}
}

// item _id
const itemId = location.search.slice(location.search.indexOf("id=") + 3, location.search.length).slice(0, location.search.slice(location.search.indexOf("id=") + 3, location.search.length).indexOf("&"));

// get the categories and shows them
(async function (){
	const allProduct = await axios.get("/api/get/product/byid?id="+ itemId);

	allProduct.data.data.categories.forEach(cat => {

		const seletedCategory = document.getElementById("seletedCategory");
		const container = document.createElement("span");

		container.classList.add("p-1");
		container.classList.add("m-2");
		container.classList.add("shadow");
		container.classList.add("border");
		container.classList.add("rounded");
		container.classList.add("cursor-pointer");
		container.classList.add("activeCategory");

		// assign a value to the container
		container.innerText = cat;
		// add the cat to the categories array newCategory
		addNewCategory(cat);

		seletedCategory.append(container);

		// assign an event listiner for all containers being created
		listenForCategory_remove(container);
	});
})();