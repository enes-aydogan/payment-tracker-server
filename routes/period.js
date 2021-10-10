const express = require('express');
const periodController = require('../controllers/period');
const router = express.Router();

let {create} = periodController

router.post('/', create)

module.exports = router;