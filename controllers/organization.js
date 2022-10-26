const asyncHandler = require("../middlewares/async");
const orgService = require("../services/OrgService");

module.exports.create = asyncHandler(async (req, res, next) => {

  let organization = await orgService.create(req);
  res.status(201).json({ success: true, data: organization });
});

module.exports.getAll = asyncHandler(async (req, res, next) => {
  let userID = req.params.id
  let organizations = await orgService.getAll(userID);
  res.status(201).json({ success: true, data: organizations });
});
