const express = require("express");
const orgUserController = require("../controllers/orgUser");
const router = express.Router();

let { create } = orgUserController;

router.post("/", create);

module.exports = router;
