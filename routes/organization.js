const express = require("express");
const orgController = require("../controllers/organization");
const router = express.Router();
const auth = require("../middlewares/auth");


let { create } = orgController;
let { checkAuth } = auth;


router.post("/", checkAuth, create);

module.exports = router;
