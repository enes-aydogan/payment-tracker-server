const express = require("express");
const authController = require("../controllers/auth");
const auth = require("../middlewares/auth");
const router = express.Router();

let { login, getMe } = authController;
let { checkAuth } = auth;

router.post("/login", login);
router.get("/me", checkAuth, getMe);

module.exports = router;
