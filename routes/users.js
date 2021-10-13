const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

let { create } = userController;

router.post("/", create);

module.exports = router;
