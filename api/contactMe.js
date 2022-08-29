//  contact me

const nodemailer = require("../config/email");
const alerts = require("../constants/alerts");

module.exports = (req, res) => {
	console.log("body", req.body);

	const { email, message, name } = req.body;

	nodemailer({ from: email, to: "eewoma75@gmail.com", subject: "GoInt", text: name + "\n" + message }, (err, done) => {
		if(err){
			console.error("Error>>", err);
			return res.status(500).json({ status: 500, alert: alerts.DANGER, message: "Could not place mail", err: err.message });
		}

		return res.status(200).json({ status: 200, alert: alerts.SUCCESS, message: "Successfully sent mail", err: null, data: done });
	});
}