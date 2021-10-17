const asyncHandler = require("../middlewares/async");
const orgService = require("../services/OrgService");

module.exports.create = asyncHandler(async (req, res, next) => {

  let organization = await orgService.create(req);
  res.status(201).json({ success: true, data: organization });
});

