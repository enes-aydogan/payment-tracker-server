const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();
const auth = require('../middlewares/auth')

let { create, getUserInfo } = userController;
let { checkAuth } = auth

router.post("/", create);

router.get('/getUserInfo', checkAuth, getUserInfo)

module.exports = router;
