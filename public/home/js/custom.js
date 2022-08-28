// custom script to help all other script

// link function for navigation
function link({ url: u, name: n, target: t }) {
	window.open(u, n, t);
	// windows.open takes (url, name of windows opened, target, features like size of windows)
}

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", e => {
	e.preventDefault();

	const data = {
		name: contactForm[0].value,
		email: contactForm[1].value,
		message: contactForm[2].value
	}

	console.log("data", data);

	axios.post("/contactme", data).then(res => {
		console.log("res", res.data);
	}).catch(err => {
		console.error("error", err);
	});
});