const jwt = require("jsonwebtoken");

const asyncHandler = require("./async");
const UserService = require("../services/UserService");

exports.checkAuth = asyncHandler(async (req, res, next) => {
  let header = req.get("Authorization");

  let token = header.startsWith("Bearer") ? header.split(" ")[1] : null;

  let decoded = {};
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res
        .status(401)
        .json({ success: false, message: "jwt expired" })
        .end();
    }
  }

  req.user = await UserService.get(decoded.id);
  next();
});
