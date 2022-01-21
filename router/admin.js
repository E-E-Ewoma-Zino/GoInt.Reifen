// ALL ROUTES GOINT TO THE ADMIN "/admin" WILL BE IN THIS PAGE
const express = require("express");
const upload = require("../config/multer");
const login = require("../controllers/admin/login");
const orders = require("../controllers/admin/order");
const products = require("../controllers/admin/products");
const settings = require("../controllers/admin/settings");
const category = require("../controllers/admin/category");
const dashboard = require("../controllers/admin/dashboard");
const addProduct = require("../controllers/admin/addProduct");
const editproduct = require("../controllers/admin/edit_product");
const orderdetails = require("../controllers/admin/orderDetails");
const auth = require("../controllers/auth/authentication");

// This router is for the home / routes
const router = express.Router();


// @desc    login page
// @route   GET /admin/
router.get("/", (req, res) => login.get(req, res));

// @desc    login page
// @route   POST admin/login
router.post("/login", (req, res, next) =>  auth.login(req, res, next));

// @desc    dashboard page
// @route   GET /admin/dashboard
router.get("/dashboard", (req, res) => dashboard.get(req, res));

// @desc    products page
// @route   GET /admin/products
router.get("/products", (req, res) => products.get(req, res));

// @desc    orders page
// @route   GET /admin/orders
router.get("/orders", (req, res) => orders.get(req, res));

// @desc    orderdetails page
// @route   GET /admin/orderdetails
router.get("/orderdetails", (req, res) => orderdetails.get(req, res));

// @desc    category page
// @route   GET /admin/category
router.get("/category", (req, res) => category.get(req, res));

// @desc    settings page
// @route   GET /admin/settings
router.get("/settings", (req, res) => settings.get(req, res));

// @desc    AddProduct page
// @route   GET /admin/AddProduct
router.get("/addProduct", (req, res) => addProduct.get(req, res));

// @desc    edit products page
// @route   GET /admin/edit/:productId
router.get("/edit/:productId", (req, res) => editproduct.get(req, res));

// @desc    edit products page
// @route   POST /admin/edit/:productId
router.post("/edit/:productId", upload.array("img"), (req, res) => editproduct.post(req, res));

module.exports = router;