const express = require("express");
const orgController = require("../controllers/organization");
const router = express.Router();

let { create } = orgController;

router.post("/", create);

module.exports = router;
