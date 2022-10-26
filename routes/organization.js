const express = require("express");
const orgController = require("../controllers/organization");
const router = express.Router();
const auth = require("../middlewares/auth");


let { create, getAll } = orgController;
let { checkAuth } = auth;


router.post("/", checkAuth, create);
router.get("/:id", checkAuth, getAll);

module.exports = router;
