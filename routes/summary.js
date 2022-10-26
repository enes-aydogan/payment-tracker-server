const express = require("express");
const summaryController = require("../controllers/summary");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middlewares/auth");
let { validate } = require("../middlewares/validate");

let { getSummary } = summaryController;
let { checkAuth } = auth;

router.get("/:perID", checkAuth, getSummary)

module.exports = router;