const express = require('express');
const paymentController = require('../controllers/payment');
const router = express.Router();
const uploadImage = require('../utils/UploadImage')

let {create} = paymentController

router.post('/:id', uploadImage, create)

module.exports = router;