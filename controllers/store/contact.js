// controlls the store contact route

module.exports = {
	get: (req, res) => {
		res.render("store/contact", {
			user: req.userDetails,
		});
	}
}
