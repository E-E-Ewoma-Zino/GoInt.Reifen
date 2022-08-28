const express = require("express");
const home = require("../controllers/home/index");
const aboutUs = require("../controllers/home/aboutUs");
const services = require("../controllers/home/services");
const servicesDetails = require("../controllers/home/servicesDetails");
const store = require("../controllers/home/store");
const storeDetails = require("../controllers/home/storeDetails");

const router = express.Router();

// @desc	Home Router
router.get("/", (req, res) => res.redirect("/home"));

// @desc	Home Router
router.get("/home", (req, res) => home(req, res));

// @desc	About Route
router.get("/about", (req, res) => aboutUs(req, res));

// @desc	Store Route
router.get("/store", (req, res) => store(req, res));

// @desc	Store Route
router.get("/storeDetails", (req, res) => storeDetails(req, res));

// @desc	Services Route
router.get("/services", (req, res) => services(req, res));

// @desc	Services Route
router.get("/services/:title", (req, res) => servicesDetails.get(req, res));

// @desc	Services Route
router.post("/services/:title", (req, res) => servicesDetails.post(req, res));

module.exports = router;