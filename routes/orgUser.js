const express = require("express");
const orgUserController = require("../controllers/orgUser");
const router = express.Router();
const auth = require("../middlewares/auth");

let { create, getUsersByOrgID, getOrgsByUserID } = orgUserController;
let { checkAuth } = auth;

router.post("/:userID/:orgID", create);
router.get("/getOrgsByUserID", checkAuth, getOrgsByUserID);
router.get("/:id", checkAuth, getUsersByOrgID);

module.exports = router;
