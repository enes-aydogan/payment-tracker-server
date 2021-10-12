const OrgUser = require('../models/OrgUser');

module.exports.create = async (orgID, userID) => {

    let orgUser = new OrgUser({
        orgID: orgID,
        userID: userID
    });

    await orgUser.save();
    
    return orgUser;
}