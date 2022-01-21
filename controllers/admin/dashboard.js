// all the admin dashboard route code goes here
const _get = require("../../libs/get");
const error500 = require("../errors/error500");
const _bird = require("../../utils/messageBird");
const logger = require("../../utils/logger");

module.exports = {
    get(req, res) {
        try {
            res.render("admin/dashboard");
        } catch (err) {
            _bird.message("danger", err);
            console.error(":::", err);
            error500(req, res);
        }
    }
}
