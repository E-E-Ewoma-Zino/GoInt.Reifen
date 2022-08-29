// ALL ROUTES GOINT TO THE ADMIN "/admin" WILL BE IN THIS PAGE
const express = require("express");
const uploads = require("../config/multer");
const products = require("../api/products");
const orders = require("../controllers/admin/order");
const apiRedirect = require("../middleware/apiRedirect");
const getReq = require("../api/getReq");
const deleteMedia = require("../api/deleteMedia");
const contactme = require("../api/contactme");

// This router is for the home / routes
const router = express.Router();

// @desc	get request
// @route	/get/:schema/:method
router.get("/get/:schema/:method", (req, res) => getReq(req, res));

// POST

// Product
// @desc	products page
// @route	POST /admin/products
router.route("/products")
.post(uploads.array("image"), (req, res) => products.post(req, res))
.put((req, res) => products.put(req, res))
.patch(uploads.array("image"), (req, res) => products.patch(req, res))
.delete((req, res) => products.delete(req, res));

// @desc	delete a media
// @route	/api/deletemedia
router.delete("/deletemedia", (req, res) => deleteMedia(req, res));

// @desc	orders page
// @route	GET /admin/orders
router.get("/orders", apiRedirect, (req, res) => orders.get(req, res));


// @desc	orders page
// @route	GET /contactme
router.post("/contactme", (req, res) => contactme(req, res));

module.exports = router;