const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const ErrorResponse = require('../utils/ErrorResponse');


module.exports.login = async (email, password) => {
    let user = await User.findOne({email: email});
    
    if(!user)
        throw new ErrorResponse('No user', 400)

    console.log("original pass")
    console.log(user)

    console.log("entered pass")
    console.log(password)
    
    let match = await bycrypt.compare(password, user.password);

    if(!match)
        throw new ErrorResponse('Password is incorrect', 401)
    
    const token = jwt.sign(
        {email: user.email, id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )

    return {
        user: user,
        token: token
    }

};