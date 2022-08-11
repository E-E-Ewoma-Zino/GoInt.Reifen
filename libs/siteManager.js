// siteManager
const Edit = require("./edit");
const siteManager = require("../schema/SiteManager");

class SiteManager extends Edit{
	constructor(schema){
		super(schema);
	}
}

module.exports = new SiteManager(siteManager);