const asyncHandler = require("../middlewares/async");
const orgUserService = require("../services/OrgUserService");

module.exports.create = asyncHandler(async (req, res, next) => {
  let orgID = req.body.orgID;
  let userID = req.body.userID;

  let orgUser = await orgUserService.create(orgID, userID);
  res.status(201).json({ success: true, data: orgUser });
});
//get ekelencek