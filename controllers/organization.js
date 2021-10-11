const asyncHandler = require("../middlewares/async");
const orgService = require("../services/OrgService");

module.exports.create = asyncHandler(async (req, res, next) => {

  let organization = await orgService.create(req.body);
  res.status(201).json({ success: true, data: organization });
});

