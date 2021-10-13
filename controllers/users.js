const asyncHandler = require("../middlewares/async");
const userService = require("../services/UserService");

module.exports.create = asyncHandler(async (req, res, next) => {
  let user = await userService.create(req.body);
  res.status(201).json({ success: true, data: user });
});

module.exports.getUserInfo = asyncHandler(async (req, res, next) => {
  let userInfo = await userService.getUserInfo(req);
  res.status(201).json({ success: true, data: userInfo });
});