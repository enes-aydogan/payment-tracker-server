const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

let {login} = authController

router.post('/login', login)

module.exports = router;