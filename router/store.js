const express = require("express");
const home = require("../controllers/store/index");
const categories = require("../controllers/store/categories");
const contact = require("../controllers/store/contact");
const productPage = require("../controllers/store/product-page");
const checkOut = require("../controllers/store/check-out");
const shoppingCart = require("../controllers/store/shopping-cart");
const loginRegister = require("../controllers/store/login-register");
const getUser = require("../middleware/getUser");
const register = require("../authentication/register");
const login = require("../authentication/login");
const logout = require("../authentication/logout");

const router = express.Router();

// @desc	Store Router
router.get("/", getUser, (req, res) => res.redirect("/store/home"));

// @desc	Register router
router.get("/login-register", getUser, (req, res) => loginRegister.get(req, res));

// @desc	Register router
router.post("/register", getUser, (req, res) => register(req, res));

// @desc	Login router
router.post("/login", getUser, (req, res, next) => login(req, res, next));

// @desc	LogOut router
router.get("/logOut", getUser, (req, res) => logout(req, res));

// @desc	Store Router
router.get("/home", getUser, (req, res) => home.get(req, res));

// @desc	Categories Router
router.get("/categories", getUser, (req, res) => categories.get(req, res));

// @desc	Contact Router
router.get("/contact", getUser, (req, res) => contact.get(req, res));

// @desc	shopping-cart Router
router.get("/shopping-cart", getUser, (req, res) => shoppingCart.get(req, res));

// @desc	product-page Router
router.get("/categories/:product", getUser, (req, res) => productPage.get(req, res));

// @desc	check-out Router
router.get("/check-out", getUser, (req, res) => checkOut.get(req, res));

module.exports = router;