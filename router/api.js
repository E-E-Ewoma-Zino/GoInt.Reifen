// ALL ROUTES GOINT TO THE ADMIN "/admin" WILL BE IN THIS PAGE
const express = require("express");
const products = require("../api/products");
const uploads = require("../config/multer");
const login = require("../controllers/admin/login");
const orders = require("../controllers/admin/order");
const category = require("../controllers/admin/category");
const apiRedirect = require("../middleware/apiRedirect");

// This router is for the home / routes
const router = express.Router();


// @desc    login page
// @route   GET /admin/
router.get("/", apiRedirect, (req, res) => login.get(req, res));

// @desc    products page
// @route   GET /admin/products
router.get("/products", (req, res) => products.get(req, res));

// @desc    products page
// @route   POST /admin/products
router.post("/products", uploads.array("image"), (req, res) => products.post(req, res));

// @desc    orders page
// @route   GET /admin/orders
router.get("/orders", apiRedirect, (req, res) => orders.get(req, res));

// @desc    category page
// @route   GET /admin/category
router.get("/category", apiRedirect, (req, res) => category.get(req, res));

module.exports = router;