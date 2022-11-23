const Organization = require("../models/Organization");

module.exports.create = async (req) => {
  let { name, address } = req.body;
  let userID = req.user._id;

  let organization = new Organization({
    name: name,
    address: address,
    ownerID: userID,
  });

  await organization.save();

  return organization;
};

module.exports.getAll = async (userID) => {
  let organization = await Organization.find({ ownerID: userID });
  return organization;
};
