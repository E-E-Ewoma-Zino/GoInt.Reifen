// handle all api get req
const user = require("../libs/user");
const page = require("../libs/page");
const products = require("../libs/products");

module.exports = (req, res) => {
	let schema = null;

	// assign the schema
	switch (req.params.schema.toLowerCase()) {
		case "product": schema = products;
			break;
		case "user": schema = user;
			break;
		case "page": schema = page;
			break;
		default: return res.status(404).json({ err: "Could not find the schema", message: "Bad request!", alert: "danger" });
	}

	// call the method
	switch (req.params.method.toLowerCase()) {
		case "all": all(req, res);
			break;
		case "byid": byId(req, res);
			break;
		case "search": search(req, res);
			break;
		case "byopt": byOpt(req, res);
			break;
		case "populated": allAndPopulate(req, res);
			break;
		case "populatedbyid": byIdAndPopulate(req, res);
			break;
		default: return res.status(404).json({ err: "Could not find the method", message: "Bad request!", alert: "danger" });
	}

	// define the method
	async function all(req, res) {
		try {
			const {status, ...data} = await schema.findAll();
			return res.status(status).json({ status, ...data });
		} catch (error) {
			return res.status(500).json({ message: "An error occured in our server", err: error.message, alert: "danger" });
		}
	}

	async function byId(req, res) {
		try {
			const {status, ...data} = await schema.findById(req.query.id);
			return res.status(status).json({ status, ...data });
		} catch (error) {
			return res.status(500).json({ message: "An error occured in our server", err: error.message, alert: "danger" });
		}
	}

	async function byOpt(req, res) {
		try {
			const {status, ...data} = await schema.findAll({ [req.query.opt]: req.query.value });
			return res.status(status).json({ status, ...data });
		} catch (error) {
			return res.status(500).json({ message: "An error occured in our server", err: error.message, alert: "danger" });
		}
	}

	async function allAndPopulate(req, res) {
		try {
			const {status, ...data} = await schema.findAllAndPopoulate({}, req.query.opt);
			return res.status(status).json({ status, ...data });
		} catch (error) {
			return res.status(500).json({ message: "An error occured in our server", err: error.message, alert: "danger" });
		}
	}

	async function byIdAndPopulate(req, res) {
		try {
			const {status, ...data} = await schema.findByIdAndPopoulate(req.query.id, req.query.opt);
			return res.status(status).json({ status, ...data });
		} catch (error) {
			return res.status(500).json({ message: "An error occured in our server", err: error.message, alert: "danger" });
		}
	}

	async function search(req, res) {
		try {
			const {status, ...data} = await schema.search(req.query.query, req.query.path);
			return res.status(status).json({ status, ...data });
		} catch (error) {
			return res.status(500).json({ message: "An error occured in our server", err: error.message, alert: "danger" });
		}
	}
}