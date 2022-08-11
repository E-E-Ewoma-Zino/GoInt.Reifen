const pages = require("../libs/page");
const siteManager = require("../libs/siteManager");

module.exports = {
	get: async ({ pageName }) => {
		try {
			// find the page by its name
			let thePage = await (await pages.findAll({["page"]: pageName})).data;
			// if page does not exist, create it

			if (!thePage.length) {
				thePage = await (await pages.create(require("../pages/" + pageName))).data;
			}

			// get the site settings from site mamnager
			let theSiteManager = await (await siteManager.findAll()).data;
			// if settings does not exist, create it
			if (!theSiteManager.length) {
				theSiteManager = await (await siteManager.create(require("../pages/siteManager"))).data;
			} 

			// check if the output is an arr or obj, if arr convert to obj
			if(Array.isArray(thePage)) {
				thePage = thePage[thePage.length - 1];
			}
			if(Array.isArray(theSiteManager)) {
				theSiteManager = theSiteManager[theSiteManager.length - 1];
			}
	
			// send data
			return { page: thePage, siteSetting: theSiteManager };
		} catch (err) {
			console.error("Could not get page", err);
			return null;
		}
	},
	remove: async ({ pageName }) => {
		try {
			// find the page by its name
			const thePage = await (await pages.findAll({["page"]: pageName})).data;
			// if page does not exist, create it
			if (!thePage.length) {
				return null;
			}

			const deletedPage = await (await pages.remove(thePage[thePage.length - 1]._id)).data;
			if(!deletedPage) return null;
	
			// send data
			return null;
		} catch (err) {
			console.error("Could not get page", err);
			return null;
		}
	}
}