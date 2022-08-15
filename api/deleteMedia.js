// this script deletes media

const removeMedia = require("./helper/removeMedia");

module.exports = async (req, res) => {
	console.log("body<", req.body);

	const { message, err, status, data, alert } = await removeMedia(req.body);
	res.status(status).json({ message, err, data, alert, status });
}