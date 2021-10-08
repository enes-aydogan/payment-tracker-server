const express = require('express');

const userController = require('../controllers/users');

let {create} = userController

const router = express.Router();

router.post('/', create)

module.exports = router;