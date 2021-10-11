const express = require("express");
const periodController = require("../controllers/period");
const router = express.Router();

let { create, get, finalize } = periodController;

router.post("/:id", create);
router.get("/:id", get);
router.post('/finalize/:id', finalize);

module.exports = router;
