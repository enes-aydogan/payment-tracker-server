const express = require("express");
const periodController = require("../controllers/period");
const router = express.Router();

let { create, get } = periodController;

router.post("/:id", create);
router.get("/:id", get);

module.exports = router;
