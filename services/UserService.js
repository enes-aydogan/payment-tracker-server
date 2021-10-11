const User = require('../models/User');
const bcrypt = require('bcryptjs')

module.exports.create = async (props) => {
    let {firstName, lastName, email, password} = props;

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    let user = new User({
        firstName: firstName,
        lastName: lastName,
        email:email,
        password: hash
    });

    await user.save();

    return user;
};

module.exports.get = async (userID) => {
    let user = await User.findById(userID);
    
    return user;
};