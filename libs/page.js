// page
const Edit = require("./edit");
const page = require("../schema/Pages");

class Page extends Edit{
	constructor(schema){
		super(schema);
	}
}

module.exports = new Page(page);