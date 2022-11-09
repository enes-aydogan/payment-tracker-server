const express = require("express");
const paymentController = require("../controllers/payment");
const router = express.Router();
const uploadImage = require("../utils/UploadImage");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const { route } = require("./users");

let {
  create,
  getInfo,
  ownPayments,
  ownDebt,
  ownPastPayments,
  ownPastDebt,
  getAllPastPayments,
  getAllPastPaymentsByPerID,
} = paymentController;
let { checkAuth } = auth;

router.post("/:id", checkAuth, uploadImage, create);

router.get("/getInfo", checkAuth, getInfo);
router.get("/ownPayments/:orgID", checkAuth, ownPayments);
router.get("/ownDebt", checkAuth, ownDebt);
router.get("/ownPastPayments/:perID", checkAuth, ownPastPayments);
router.get("/ownPastDebt/:perID", checkAuth, ownPastDebt);
router.get("/allPastPayments/:orgID", checkAuth, getAllPastPayments);
router.get(
  "/allPastPaymentsByPerID/:orgID/:perID",
  checkAuth,
  getAllPastPaymentsByPerID
);

module.exports = router;
