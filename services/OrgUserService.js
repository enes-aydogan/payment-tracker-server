const OrgUser = require("../models/OrgUser");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.create = async (orgID, userID) => {
  let isExist = await OrgUser.find({ orgID: orgID, userID: userID });

  if (isExist.length > 0) {
    return [];
  }
  console.log("after return");
  let orgUser = new OrgUser({
    orgID: orgID,
    userID: userID,
  });

  await orgUser.save();

  console.log("work org-user", orgUser);
  return orgUser;
};

module.exports.getUsersByOrgID = async (orgID, userID) => {
  let users = await OrgUser.find({
    orgID: orgID,
    userID: { $ne: userID },
  }).populate("userID");

  if (users.length < 1) return [];

  return users;
};

module.exports.getOrgsByUserID = async (userID) => {
  let orgs = await OrgUser.find({ userID: userID }).populate("orgID");
  console.log(orgs);
  if (!orgs) throw new ErrorResponse("Orgs cant find", 404);

  return orgs;
};
