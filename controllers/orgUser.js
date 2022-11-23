const asyncHandler = require("../middlewares/async");
const orgUserService = require("../services/OrgUserService");

module.exports.create = asyncHandler(async (req, res, next) => {
  let orgID = req.params.orgID;
  let userID = req.params.userID;

  let orgUser = await orgUserService.create(orgID, userID);
  res.status(201).json({ success: true, data: orgUser });
});

module.exports.getUsersByOrgID = asyncHandler(async (req, res, next) => {
  let orgID = req.params.id;
  let userID = req.user._id;
  let users = await orgUserService.getUsersByOrgID(orgID, userID);
  res.status(200).json({ success: true, data: users });
});

module.exports.getOrgsByUserID = asyncHandler(async (req, res, next) => {
  let userID = req.user._id;
  let orgs = await orgUserService.getOrgsByUserID(userID);
  res.status(200).json({ success: true, data: orgs });
});
