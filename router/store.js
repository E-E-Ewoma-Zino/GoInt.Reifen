const express = require("express");
const store = require("../controllers/store/index");

const router = express.Router();

// @desc	Store Router
router.get("/", (req, res) => store.get(req, res));

module.exports = router;