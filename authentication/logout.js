// controlls all the authentication for the users

module.exports = (req, res) => {
	req.logOut();
	return res.redirect("/");
}