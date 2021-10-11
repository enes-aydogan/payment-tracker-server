const express = require('express');
const paymentController = require('../controllers/payment');
const router = express.Router();
const uploadImage = require('../utils/UploadImage')
const auth = require('../middlewares/auth')

let {create} = paymentController
let {checkAuth} = auth

router.post('/:id', checkAuth, uploadImage, create)

module.exports = router;