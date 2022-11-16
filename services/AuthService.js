const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.login = async (email, password) => {
  let user = await User.findOne({ email: email });

  if (!user) throw new ErrorResponse("No user", 400);

  let match = await bycrypt.compare(password, user.password);

  if (!match) throw new ErrorResponse("Password is incorrect", 401);

  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return {
    user: user,
    token: token,
  };
};

// get user
module.exports.getMe = async (userID) => {
  let user = await User.findById(userID).select("-password");

  return user;
};
