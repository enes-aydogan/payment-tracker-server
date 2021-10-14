const express = require("express");
const paymentController = require("../controllers/payment");
const router = express.Router();
const uploadImage = require("../utils/UploadImage");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

let { create, getInfo, ownPayments } = paymentController;
let { checkAuth } = auth;

router.post("/:id", checkAuth, uploadImage, create);

router.get("/getInfo", checkAuth, getInfo);
router.get("/ownPayments", checkAuth, ownPayments);

module.exports = router;
