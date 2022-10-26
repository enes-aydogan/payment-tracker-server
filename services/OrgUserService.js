const OrgUser = require('../models/OrgUser');
const ErrorResponse = require('../utils/ErrorResponse');

module.exports.create = async (orgID, userID) => {

    
    let isExist = await OrgUser.find({orgID: orgID, userID: userID})

    if(isExist.length > 0){
        throw new ErrorResponse("This user already exist", 401)
    }

    let orgUser = new OrgUser({
        orgID: orgID,
        userID: userID
    });

    await orgUser.save();
    
    return orgUser;
}

module.exports.getUsersByOrgID = async(orgID, userID) => {
    let users = await OrgUser.find({ orgID: orgID, userID: {$ne: userID} }).populate("userID");
    
    if(users.length < 1)
        return []

    return users
}

module.exports.getOrgsByUserID = async(userID) => {
    let orgs = await OrgUser.find({ userID: userID }).populate("orgID");

    if(!orgs)
        throw new ErrorResponse("Orgs cant find", 404);
    
    return orgs
}