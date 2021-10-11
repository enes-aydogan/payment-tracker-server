const Organization = require('../models/Organization');

module.exports.create = async (props) => {
    let {name, address} = props;

    let organization = new Organization({
        name: name,
        address: address
    });

    await organization.save();
    
    return organization;
}