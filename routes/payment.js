const express = require("express");
const paymentController = require("../controllers/payment");
const router = express.Router();
const uploadImage = require("../utils/UploadImage");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const { route } = require("./users");

let { create, getInfo, ownPayments, ownDebt, ownPastPayments, ownPastDebt } = paymentController;
let { checkAuth } = auth;

router.post("/:id", checkAuth, uploadImage, create);

router.get("/getInfo", checkAuth, getInfo);
router.get("/ownPayments", checkAuth, ownPayments);
router.get("/ownDebt", checkAuth, ownDebt);
router.get("/ownPastPayments", checkAuth, ownPastPayments);
router.get("/ownPastDebt", checkAuth, ownPastDebt);


module.exports = router;
