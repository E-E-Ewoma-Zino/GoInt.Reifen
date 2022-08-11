// custom code for all admin Pages
// 
// url for the axios.get and post method
const hostURL = window.location.origin;



// function to meke btn have links
function btnLink(link, name) {
	window.open(link, name);
}

// The window.open() takes 4 arguments as paramenters. The (link: "https://blah.com/blah", name: "_blank || any", something, replace: "to replace the name")

// To refresh the page
function refresh() {
	window.location.reload();
}

// using messageBird
const messageBox = document.getElementById("littleMessageBox");
const messageBird = document.getElementById("littleMessage");

// message sender
function messager(data) {
	$("#littleMessageBox").fadeIn(() => {
		setTimeout(() => {
			$("#littleMessageBox").fadeOut();
		}, 7000);
	});
	messageBox.classList.replace(`alert-${data.replace[0]}`, `alert-${data.replace[1]}`);
	messageBird.innerHTML = data.message;
}

// for modal display
// show modal
const myModal = document.getElementById("modal");
function modal(data) {
	const content = document.createElement("div");
	if (!data) {
		messager({
			replace: ["success", "danger"],
			message: "Modal is disabled"
		});
		return;
	}
	else if (data.type === "info") {
		myModal.style.display = "flex";
		content.innerHTML = `<h4 class="card-title">${data.title}</h4>
		<p class="card-description">${data.message}</p>`;
	}
	else if (data.type === "categoryInfo") {
		myModal.style.display = "flex";
		getAxios("/admin/categoryAPI", (err, response) => {
			if (err) {
				console.log("err:::", err);
			}
			else {
				content.innerHTML = `<h4 class="card-title">${data.title}</h4>
				<div class="card-description">
					<h4>Parents</h4>
					<span>${response[data.index].parents.length ? response[data.index].parents.map(parent => parent.name) : "None"}</span>
					<hr>
					<h4>Children</h4>
					<span>${response[data.index].children.length ? response[data.index].children.map(child => child.name) : "None"}</span>
					<hr>
					<h4>Products</h4>
					<span>${response[data.index].products.length ? response[data.index].products.map(product => product.name) : "None"}</span>
				</div>`
			}
		});
	}
	else if (data.type === "form") {
		// console.log("Click", data);
		console.log(myModal.style.display = "flex");
		content.innerHTML = `<h4 class="card-title">${data.title}</h4>
		<p class="card-description">${data.message}</p>
		<div class="text-center my-4"><button type="button" class="btn btn-danger ml-2" onclick="${data.method.name}('${data.method.params.url}', '${data.method.params.itemId}')">
		Confirm</button>
		<a href="#x" class="btn btn-light" onclick="closeModal()">Cancel</a></div>`;
	}
	else {
		messager({
			replace: ["success", "danger"],
			message: "Modal is disabled"
		});
		return;
	}

	myModal.firstElementChild.firstElementChild.firstElementChild.innerHTML = "";
	myModal.firstElementChild.firstElementChild.firstElementChild.append(content);
}

// deactivate modal
window.onclick = (e) => {
	if (e.target == myModal) {
		myModal.style.display = "none";
	}
}

// close the modal
function closeModal() {
	myModal.style.display = "none";
}