const express = require("express");
const home = require("../controllers/store/index");
const categories = require("../controllers/store/categories");
const contact = require("../controllers/store/contact");
const productPage = require("../controllers/store/product-page");
const checkOut = require("../controllers/store/check-out");
const shoppingCart = require("../controllers/store/shopping-cart");
const auth = require("../controllers/auth/authentication");
const loginRegister = require("../controllers/store/login-register");
const userOnly = require("../middleware/userOnly");

const router = express.Router();

// @desc	Store Router
router.get("/", (req, res) => res.redirect("/store/home"));

// @desc	Register router
router.get("/login-register", (req, res) => loginRegister.get(req, res));

// @desc	Register router
router.post("/register", (req, res) => auth.register(req, res));

// @desc	Login router
router.post("/login", (req, res, next) => auth.login(req, res, next));

// @desc	LogOut router
router.post("/logOut", (req, res) => auth.logOut(req, res));

// @desc	Store Router
router.get("/home", (req, res) => home.get(req, res));

// @desc	Categories Router
router.get("/categories", userOnly, (req, res) => categories.get(req, res));

// @desc	Contact Router
router.get("/contact", (req, res) => contact.get(req, res));

// @desc	shopping-cart Router
router.get("/shopping-cart", (req, res) => shoppingCart.get(req, res));

// @desc	product-page Router
router.get("/product-page", (req, res) => productPage.get(req, res));

// @desc	check-out Router
router.get("/check-out", (req, res) => checkOut.get(req, res));

module.exports = router;