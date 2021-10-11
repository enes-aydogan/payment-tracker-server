const Period = require("../models/Period");
const Organization = require('../models/Organization')

module.exports.create = async (orgID, body) => {
    let {periodName, status} = body;
    
    let period = {
        periodName: periodName,
        status: status,
        payments: [],
    };

    let organization = await Organization.findById(orgID)

    organization.periods.push(period)

    await organization.save()

    return period;
};

module.exports.get = async (id) => {
  let period = await Period.findById(id);
  return period;
};
