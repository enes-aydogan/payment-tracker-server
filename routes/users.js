const express = require("express");
const userController = require("../controllers/users");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middlewares/auth");
let { validate } = require("../middlewares/validate");

let { create, getUserInfo, getUserByMail, getUserByID } = userController;
let { checkAuth } = auth;

router.post(
  "/",
  [
    check("firstName")
      .isLength({ min: 2, max: 20 })
      .withMessage("firstName should be between 2-20 characters"),
    check("lastName")
      .isLength({ min: 2, max: 20 })
      .withMessage("lastName should be between 2-20 characters"),
    check("email").isEmail().withMessage("Please write an email"),
    check("password")
      .isLength({ min: 8, max: 16 })
      .withMessage("Password should be between 8-16 characters"),
  ],
  validate,
  create
);

router.get("/getUserInfo", checkAuth, getUserInfo);
router.get("/:id", checkAuth, getUserByID)
router.post("/getUserByMail", getUserByMail);

module.exports = router;
