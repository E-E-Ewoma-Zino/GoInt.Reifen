// ALL ROUTES GOINT TO THE ADMIN "/admin" WILL BE IN THIS PAGE
const express = require("express");
const upload = require("../config/multer");
const loginPage = require("../controllers/admin/login");
const orders = require("../controllers/admin/order");
const products = require("../controllers/admin/products");
const dashboard = require("../controllers/admin/dashboard");
const addProduct = require("../controllers/admin/addProduct");
const editproduct = require("../controllers/admin/edit_product");
const orderdetails = require("../controllers/admin/orderDetails");
const login = require("../authentication/login");
const register = require("../authentication/register");
const logout = require("../authentication/logout");

// This router is for the home / routes
const router = express.Router();

// @desc	login page
// @route	GET /admin/
router.get("/", (req, res) => loginPage.get(req, res));

// @desc	login page
// @route	POST admin/login
router.post("/login", (req, res, next) => login(req, res, next));

// @desc	Register page
// @route	POST admin/Register
router.post("/register", (req, res) => register(req, res));

// @desc	logOut page
// @route	POST admin/logOut
router.post("/logOut", (req, res, next) => logout(req, res, next));

// @desc	auth a user
// @route	GET /admin/dashboard
router.get("/dashboard", (req, res) => dashboard.get(req, res));

// @desc	products page
// @route	GET /admin/products
router.get("/products", (req, res) => products.get(req, res));

// @desc	AddProduct page
// @route	GET /admin/AddProduct
router.get("/addProduct", (req, res) => addProduct.get(req, res));

// @desc	edit products page
// @route	GET /admin/edit/:productId
router.get("/edit/:productId", (req, res) => editproduct(req, res));

// @desc	orders page
// @route	GET /admin/orders
router.get("/orders", (req, res) => orders.get(req, res));

// @desc	orderdetails page
// @route	GET /admin/orderdetails
router.get("/orderdetails", (req, res) => orderdetails.get(req, res));


module.exports = router;